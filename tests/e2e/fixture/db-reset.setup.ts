import { seedLocal } from "../../../scripts/seed-local";

export default async function resetDB() {
  console.log("로컬 Supabase DB 초기화 중...");
  try {
    await seedLocal();
    console.log("DB 초기화 완료");
  } catch (error) {
    console.error("DB 초기화 실패:", error);
    throw error;
  }
}
