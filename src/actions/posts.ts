"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { CreatePost, UpdatePost } from "@/schemas/post";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";

import type { Prisma } from "@/generated/prisma/client";

const POST_INCLUDE = {
  book: { include: { author: true } },
  profile: true,
} satisfies Prisma.PostInclude;

type PostWithIncludes = Prisma.PostGetPayload<{ include: typeof POST_INCLUDE }>;

async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub;
}

async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("로그인이 필요합니다");
  return userId;
}

function toPostWithBook(p: PostWithIncludes): PostWithBook {
  return {
    id: p.id,
    title: p.title ?? "",
    content: p.content ?? "",
    rating: p.rating,
    startDate: p.startDate,
    isPrivate: p.isPrivate,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    book: {
      isbn: p.book?.isbn ?? "",
      title: p.book?.title ?? "",
      contents: p.book?.contents ?? "",
      url: p.book?.url ?? "",
      publisher: p.book?.publisher ?? "",
      thumbnailUrl: p.book?.thumbnailUrl ?? "",
      publishedAt: p.book?.publishedAt ?? new Date(),
      author: { id: p.book?.author?.id, name: p.book?.author?.name ?? "" },
    },
    user: p.profile
      ? {
          id: p.profile.userId,
          profile: {
            id: p.profile.id,
            nickname: p.profile.nickname,
            avatarUrl: p.profile.avatarUrl ?? "",
            bio: p.profile.bio ?? "",
            userId: p.profile.userId,
            mostReadAuthors: [],
          },
        }
      : {
          id: "",
          profile: {
            id: 0,
            nickname: "",
            avatarUrl: "",
            bio: "",
            userId: "",
            mostReadAuthors: [],
          },
        },
  };
}

/**
 * Post 생성. Author/Book 자동 upsert를 같은 Prisma 트랜잭션에서 수행한다.
 * 인가: 로그인 사용자만, post.userId는 항상 본인 id.
 */
export async function createPost(input: CreatePost): Promise<PostWithBook> {
  const userId = await requireUserId();
  if (!input.book) throw new Error("책 정보가 필요합니다");

  const created = await prisma.$transaction(async (tx) => {
    const author = await tx.author.upsert({
      where: { name: input.book!.author },
      update: {},
      create: { name: input.book!.author },
    });

    const book = await tx.book.upsert({
      where: { isbn: input.book!.isbn },
      update: {},
      create: {
        isbn: input.book!.isbn,
        title: input.book!.title,
        contents: input.book!.contents,
        url: input.book!.url,
        publisher: input.book!.publisher,
        thumbnailUrl: input.book!.thumbnailUrl,
        publishedAt: input.book!.publishedAt,
        authorId: author.id,
        version: 1,
      },
    });

    return tx.post.create({
      data: {
        title: input.title,
        content: input.content,
        rating: input.rating,
        startDate: input.startDate,
        isPrivate: input.isPrivate,
        bookIsbn: book.isbn,
        userId,
        version: 1,
      },
      include: POST_INCLUDE,
    });
  });

  return toPostWithBook(created);
}

/**
 * Post 수정. 소유자 검증 후 Author/Book도 (필요하면) 새로 upsert.
 */
export async function updatePost(
  id: number,
  input: UpdatePost,
): Promise<PostWithBook> {
  const userId = await requireUserId();
  if (!input.book) throw new Error("책 정보가 필요합니다");

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) throw new Error("post not found");
  if (existing.userId !== userId) throw new Error("user is not owner");

  const updated = await prisma.$transaction(async (tx) => {
    const author = await tx.author.upsert({
      where: { name: input.book!.author },
      update: {},
      create: { name: input.book!.author },
    });

    const book = await tx.book.upsert({
      where: { isbn: input.book!.isbn },
      update: {},
      create: {
        isbn: input.book!.isbn,
        title: input.book!.title,
        contents: input.book!.contents,
        url: input.book!.url,
        publisher: input.book!.publisher,
        thumbnailUrl: input.book!.thumbnailUrl,
        publishedAt: input.book!.publishedAt,
        authorId: author.id,
        version: 1,
      },
    });

    return tx.post.update({
      where: { id },
      data: {
        title: input.title,
        content: input.content,
        rating: input.rating,
        startDate: input.startDate,
        isPrivate: input.isPrivate,
        bookIsbn: book.isbn,
      },
      include: POST_INCLUDE,
    });
  });

  revalidatePath(`/posts/${id}`);
  return toPostWithBook(updated);
}

/**
 * Post 소프트 딜리트. 소유자만 가능.
 */
export async function deletePost(postId: number): Promise<{ id: number }> {
  const userId = await requireUserId();
  const existing = await prisma.post.findUnique({ where: { id: postId } });
  if (!existing || existing.deletedAt) throw new Error("post not found");
  if (existing.userId !== userId) throw new Error("user is not owner");

  await prisma.post.update({
    where: { id: postId },
    data: { deletedAt: new Date() },
  });

  revalidatePath(`/posts/${postId}`);
  return { id: postId };
}

/**
 * 단일 Post 조회. isPrivate면 소유자만 접근 가능.
 */
export async function getPost(postId: string | number): Promise<PostWithBook> {
  const id = typeof postId === "string" ? Number(postId) : postId;
  if (!Number.isFinite(id)) throw new Error("invalid post id");

  const post = await prisma.post.findUnique({
    where: { id },
    include: POST_INCLUDE,
  });
  if (!post || post.deletedAt) throw new Error("post not found");

  if (post.isPrivate) {
    const userId = await getCurrentUserId();
    if (post.userId !== userId) throw new Error("접근 권한이 없습니다");
  }

  return toPostWithBook(post);
}

async function paginatePosts(
  where: Prisma.PostWhereInput,
  take: number,
  cursor?: string | number,
): Promise<PaginationResponse<PostWithBook>> {
  const cursorId =
    typeof cursor === "string" && cursor !== ""
      ? Number(cursor)
      : typeof cursor === "number"
        ? cursor
        : undefined;

  const baseWhere: Prisma.PostWhereInput = {
    ...where,
    deletedAt: null,
  };

  const posts = await prisma.post.findMany({
    where: baseWhere,
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: take + 1,
    ...(cursorId !== undefined ? { cursor: { id: cursorId }, skip: 1 } : {}),
    include: POST_INCLUDE,
  });

  const hasMore = posts.length > take;
  const sliced = hasMore ? posts.slice(0, take) : posts;
  const nextCursor = hasMore ? sliced[sliced.length - 1].id : null;
  const count = await prisma.post.count({ where: baseWhere });

  return {
    data: sliced.map(toPostWithBook),
    nextCursor,
    count,
  };
}

/**
 * 공개 post 목록 (cursor pagination).
 */
export async function getPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  return paginatePosts({ isPrivate: false }, take, cursor);
}

/**
 * 특정 user의 post 목록. 본인이 아니면 공개 post만.
 */
export async function getPostsByUser(
  targetUserId: string,
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  const me = await getCurrentUserId();
  const isOwn = me === targetUserId;
  return paginatePosts(
    isOwn
      ? { userId: targetUserId }
      : { userId: targetUserId, isPrivate: false },
    take,
    cursor,
  );
}

/**
 * 본인 post 목록 (공개+비공개).
 */
export async function getMyPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  const userId = await requireUserId();
  return paginatePosts({ userId }, take, cursor);
}
