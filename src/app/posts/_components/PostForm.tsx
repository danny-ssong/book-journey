import { createClient } from "@/utils/supabase/client";
import { FormEventHandler, useState } from "react";

export default function PostForm({ book }) {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
    }
    // const { data, error } = await supabase.from("posts").insert({
    //   title,
    //   content,
    //   book,
    // });
    //insert posts

    //에러가 아니면
    //router.push('')로 해당 책 아이디나 내가 쓴 글
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full h-12 placeholder:text-gray-400 placeholder:text-2xl  text-black text-2xl font-semibold resize-none overflow-hidden border-b-2 border-gray-500"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="w-full h-[800px] resize-none text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="w-full flex justify-end items-center">
        <button type="submit">저장</button>
      </div>
    </form>
  );
}
