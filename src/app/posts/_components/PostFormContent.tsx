"use client";
import { useState } from "react";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions/createPost";
import { updatePost } from "@/app/actions/updatePost";
import {
  CreateBookDto,
  CreatePostDto,
  Post,
} from "@/app/_models/supabaseTypes";
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
  const [startDate, setStartDate] = useState<string>(
    dayjs(initPost?.start_date ?? new Date()).format("YYYY-MM-DD"),
  );
  const [rating, setRating] = useState<number>(initPost?.rating ?? 5);
  const [isPrivate, setIsPrivate] = useState<boolean>(
    initPost?.is_private ?? false,
  );

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
    <div className="h-full">
      <article className="h-full">
        <form
          id="postForm"
          onSubmit={handleSubmit}
          className="flex h-full flex-col gap-4"
        >
          <div className="flex justify-end">
            <SelectPrivacy isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
          </div>
          <div className="flex justify-between">
            <Rating rating={rating} onClickStar={setRating} />
            <div className="flex items-center gap-2">
              <p className="text-sm">읽은 날짜</p>
              <DateInput date={startDate} setDate={setStartDate} />
            </div>
          </div>
          <input
            className="h-12 w-full resize-none overflow-hidden border px-2 py-2 text-2xl font-semibold text-black placeholder:text-2xl placeholder:text-gray-400"
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="w-full flex-1 resize-none border px-2 py-2 text-black placeholder:text-gray-200"
            placeholder="감상을 작성해보세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </article>
      <footer className="fixed bottom-0 left-0 w-full bg-slate-200 p-4">
        <div className="flex w-full items-center justify-end">
          <Button type="submit" form="postForm" color="black">
            완료
          </Button>
        </div>
      </footer>
    </div>
  );
}
