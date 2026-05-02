"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { Profile, UpdateProfile, User } from "@/types/user";

import type { Prisma } from "@/generated/prisma/client";

const PROFILE_INCLUDE = {
  profileMostReadAuthors: { include: { author: true } },
} satisfies Prisma.ProfileInclude;

type ProfileWithIncludes = Prisma.ProfileGetPayload<{
  include: typeof PROFILE_INCLUDE;
}>;

function toUser(profile: ProfileWithIncludes): User {
  const profileResponse: Profile = {
    id: profile.id,
    nickname: profile.nickname,
    avatarUrl: profile.avatarUrl ?? "",
    bio: profile.bio ?? "",
    userId: profile.userId,
    mostReadAuthors: profile.profileMostReadAuthors.map((m) => m.author),
  };
  return { id: profile.userId, profile: profileResponse };
}

/**
 * 현재 로그인 사용자의 Profile을 User 형태로 반환한다.
 * 기존 React Query 훅(useGetMe)의 응답 타입을 보존하기 위해 { id, profile }로 감싼다.
 * 미인증이면 null을 반환하여 클라이언트가 게스트 흐름을 처리하게 한다.
 */
export async function getMe(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) {
    return null;
  }
  const userId = data.claims.sub;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: PROFILE_INCLUDE,
  });
  if (!profile) return null;
  return toUser(profile);
}

/**
 * 모든 사용자 목록 반환 (= 모든 Profile). NestJS GET /users 대체.
 */
export async function getUsers(): Promise<User[]> {
  const profiles = await prisma.profile.findMany({
    include: PROFILE_INCLUDE,
    orderBy: { createdAt: "desc" },
  });
  return profiles.map(toUser);
}

/**
 * userId(UUID)로 단일 사용자 조회. NestJS GET /users/:id 대체.
 */
export async function getUserById(userId: string): Promise<User> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: PROFILE_INCLUDE,
  });
  if (!profile) throw new Error("user not found");
  return toUser(profile);
}

/**
 * 현재 로그인 사용자의 Profile 수정. NestJS PATCH /profiles/me 대체.
 * 인가: 본인의 profile만 수정 (userId로 매칭).
 */
export async function updateMyProfile(input: UpdateProfile): Promise<User> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) {
    throw new Error("로그인이 필요합니다");
  }
  const userId = data.claims.sub;

  const data_: Prisma.ProfileUpdateInput = {};
  if (input.nickname !== undefined) data_.nickname = input.nickname;
  if (input.bio !== undefined) data_.bio = input.bio;

  const profile = await prisma.profile.update({
    where: { userId },
    data: data_,
    include: PROFILE_INCLUDE,
  });

  revalidatePath("/manage/settings/profile");
  return toUser(profile);
}
