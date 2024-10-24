"use client";
import { useState } from "react";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions/createPost";
import { updatePost } from "@/app/actions/updatePost";
import { Post } from "@/app/_types/supabaseTypes";

type Props = {
  book: SearchedBook | undefined;
  initPost?: Post;
};

export default function PostFormContent({ book, initPost = undefined }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initPost?.title ?? "");
  const [content, setContent] = useState(initPost?.content ?? "");
  const [startDate, setStartDate] = useState<string>(dayjs(initPost?.startDate ?? new Date()).format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState<string>(dayjs(initPost?.endDate ?? new Date()).format("YYYY-MM-DD"));
  const [rating, setRating] = useState<number>(initPost?.rating ?? 5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
      return;
    }

    let postId = undefined;

    if (initPost) {
      postId = await updatePost(initPost.id, book, content, startDate, endDate, rating, title);
    } else {
      postId = await createPost(book, content, startDate, endDate, rating, title);
    }

    if (postId) {
      router.push(`/posts/${postId}`);
    }
  };

  return (
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Rating rating={rating} onClickStar={setRating} />
          <div className="flex gap-4">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
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
          <button className="px-4 py-2 border border-black rounded-full" type="submit">
            저장
          </button>
        </div>
      </form>
    </article>
  );
}
