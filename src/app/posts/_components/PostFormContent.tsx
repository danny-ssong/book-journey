"use client";
import { useState } from "react";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions/createPost";
import { updatePost } from "@/app/actions/updatePost";
import { Post } from "@/app/_types/supabaseTypes";
import refreshProfileMostReadAuthors from "@/app/actions/refreshProfileMostReadAuthors";
import Button from "@/app/_components/Button";

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
  const [isPrivate, setIsPrivate] = useState<boolean>(initPost?.is_private ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
      return;
    }

    let postId = undefined;

    if (initPost) {
      postId = await updatePost(initPost.id, book, content, startDate, endDate, rating, title, isPrivate);
    } else {
      postId = await createPost(book, content, startDate, endDate, rating, title, isPrivate);
    }
    refreshProfileMostReadAuthors();
    if (postId) {
      router.push(`/posts/${postId}`);
    }
  };

  return (
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-end">
          <select
            value={String(isPrivate)}
            onChange={(e) => {
              setIsPrivate(e.target.value === "true");
            }}
            className="border px-2 py-1"
          >
            <option value="true">비공개</option>
            <option value="false">공개</option>
          </select>
        </div>
        <div className="flex justify-between">
          <Rating rating={rating} onClickStar={setRating} />
          <div className="flex gap-4">
            <input
              className="px-4 py-1 border"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="px-4 py-1 border"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <input
          className="px-2 py-2 w-full h-12 placeholder:text-gray-400 placeholder:text-2xl  text-black text-2xl font-semibold resize-none overflow-hidden border"
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="w-full h-[800px] resize-none text-black px-2 py-2 border placeholder:text-gray-200"
          placeholder="감상을 작성해보세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="w-full flex justify-end items-center">
          <Button>저장</Button>
        </div>
      </form>
    </article>
  );
}
