"use client";
import { useState } from "react";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions/createPost";
import { updatePost } from "@/app/actions/updatePost";
import { CreateBookDto, CreatePostDto, Post } from "@/app/_models/supabaseTypes";
import refreshProfileMostReadAuthors from "@/app/actions/refreshProfileMostReadAuthors";
import Button from "@/app/_components/Button";
import { useQueryClient } from "@tanstack/react-query";
import DateInput from "../../_components/DateInput";
import SelectPrivacy from "./SelectPrivacy";

type Props = {
  book: SearchedBook | undefined;
  initPost?: Post;
};

export default function PostFormContent({ book, initPost = undefined }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, setTitle] = useState(initPost?.title ?? "");
  const [content, setContent] = useState(initPost?.content ?? "");
  const [startDate, setStartDate] = useState<string>(dayjs(initPost?.start_date ?? new Date()).format("YYYY-MM-DD"));
  const [rating, setRating] = useState<number>(initPost?.rating ?? 5);
  const [isPrivate, setIsPrivate] = useState<boolean>(initPost?.is_private ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
      return;
    }

    let postId = undefined;

    const createPostDto: CreatePostDto = {
      title,
      content,
      rating,
      start_date: startDate,
      is_private: isPrivate,
      isbn: book.isbn,
    };
    const createBookDto: CreateBookDto = {
      author: book.authors[0],
      isbn: book.isbn,
      published_date: book.datetime,
      title: book.title,
      thumbnail: book.thumbnail,
    };

    if (initPost) {
      postId = await updatePost(initPost.id, createBookDto, createPostDto);
    } else {
      postId = await createPost(createBookDto, createPostDto);
    }
    refreshProfileMostReadAuthors();
    if (postId) {
      queryClient.invalidateQueries({ queryKey: ["userOwnPosts"] });
      router.push(`/posts/${postId}`);
    }
  };

  // const bookData: CreateBookDto = {
  //   isbn: book.isbn,
  //   title: book.title,
  //   author: book.authors[0],
  //   published_date: book.datetime,
  //   thumbnail: book.thumbnail,
  // };

  return (
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-end">
          <SelectPrivacy isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
        </div>
        <div className="flex justify-between">
          <Rating rating={rating} onClickStar={setRating} />
          <div className="flex gap-2 items-center">
            <p className="text-sm">읽은 날짜</p>
            <DateInput date={startDate} setDate={setStartDate} />
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
