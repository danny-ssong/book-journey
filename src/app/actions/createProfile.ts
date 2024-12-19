"use server";
import { createClient } from "@/utils/supabase/server";
import getUserOnServer from "../_lib/getUserOnServer";

export default async function createUserProfileIfNotExists() {
  const supabase = createClient();

  // 세션 정보에서 유저 정보 가져오기
  const user = await getUserOnServer();

  if (!user) {
    console.error("No user found in session");
    return;
  }
  const userId = user.id;

  // 프로필이 이미 존재하는지 확인
  const { data: profile, error: fetchError } = await supabase
    .from("profile")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!profile) {
    // 프로필이 없으면 랜덤한 이름으로 insert
    const { error: insertError } = await supabase.from("profile").insert({
      username: getRandomUserName(),
      imageURL: undefined,
      bio: "",
      mostRead_authors: [],
    });

    if (insertError) {
      console.error("Error inserting profile:", insertError);
    }
  }
}

function getRandomUserName() {
  const randomValue = Math.floor(Math.random() * 10000) + 1;
  const animals = [
    "호랑이",
    "코끼리",
    "사자",
    "기린",
    "늑대",
    "여우",
    "고양이",
    "개",
    "돌고래",
    "펭귄",
    "코알라",
    "캥거루",
    "오랑우탄",
    "하마",
    "코뿔소",
    "수달",
    "곰",
    "다람쥐",
    "독수리",
    "타조",
  ];
  const adjective = [
    "상냥한",
    "날쌘",
    "용감한",
    "행복한",
    "신중한",
    "사나운",
    "지혜로운",
    "용의주도한",
    "귀여운",
    "차분한",
    "활기찬",
    "빠른",
    "의젓한",
    "소심한",
    "튼튼한",
    "강인한",
    "친절한",
    "명랑한",
    "똑똑한",
    "사려 깊은",
  ];
  const firstRandomIndex = Math.floor(Math.random() * 20);
  const secondRandomIndex = Math.floor(Math.random() * 20);
  const randomUsername = ` ${adjective[secondRandomIndex]} ${animals[firstRandomIndex]}${randomValue}`;
  return randomUsername;
}
