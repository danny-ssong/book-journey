import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import PostPreview from "@/app/_components/PostPreview";

const posts: Tables<"posts">[] = [
  {
    content:
      "네, 해당 코드는 동작하지 않을 것입니다. 그 이유는 Tables<posts>와 같은 방식으로 제네릭 타입을 정의한 것은 잘못된 구문이기 때문입니다. TypeScript는 Supabase에서 자동으로 생성된 타입을 제공하지만, Tables라는 제네릭 타입을 사용하는 방식은 일반적으로 제공되지 않습니다.Supabase에서 생성된 타입을 사용하려면 다음과 같이 Database 타입을 직접 참조하여 특정 테이블의 타입을 가져와야 합니다.",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    id: 1,
    isbn: "1234",
    rating: 3,
    title: "this is title",
    user_id: "user_id",
  },
  {
    content: "This is content2",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),

    id: 2,
    isbn: "1234",
    rating: 3,
    title: "this is title2",
    user_id: "user_id",
  },
  {
    content: "This is content2",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),

    id: 2,
    isbn: "1234",
    rating: 3,
    title: "this is title2",
    user_id: "user_id",
  },
  {
    content: "This is content2",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),

    id: 2,
    isbn: "1234",
    rating: 3,
    title: "this is title2",
    user_id: "user_id",
  },
  {
    content: "This is content2",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),

    id: 2,
    isbn: "1234",
    rating: 3,
    title: "this is title2",
    user_id: "user_id",
  },
  {
    content: "This is content2",
    created_at: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),

    id: 2,
    isbn: "1234",
    rating: 3,
    title: "this is title2",
    user_id: "user_id",
  },
];

export default function page() {
  return (
    <main>
      <div className="mb-5 text-xl ">글 관리</div>
      <div className="">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
