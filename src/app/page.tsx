import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  //nav? 로그인, 로그아웃, 홈, 피드?(팔로워)
  //사이드 왼쪽? 글 쓰기, 세팅
  //메인 (바로 글 관리)
  //사이드 오른쪽 추천??

  const supabase = createClient();

  return <main> 새로운 글을 작성해보세요 !</main>;
}
