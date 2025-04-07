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
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import MonthPicker from "../../_components/DateInput";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createOrUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
      return;
    }

    let postId = undefined;
    setIsSubmitting(true);

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
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      <article className="h-full">
        <form
          id="postForm"
          onSubmit={createOrUpdatePost}
          className="flex h-full flex-col gap-4"
        >
          <div className="flex justify-end">
            <SelectPrivacy isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
          </div>
          <div className="flex justify-between">
            <Rating rating={rating} onClickStar={setRating} />
            <div className="flex items-center gap-2">
              <p className="text-sm">읽은 날짜</p>
              <MonthPicker date={startDate} setDate={setStartDate} />
            </div>
          </div>
          <input
            className="h-12 w-full resize-none overflow-hidden rounded-lg border p-4 text-2xl font-semibold placeholder:text-2xl"
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="w-full flex-1 resize-none rounded-lg border p-4"
            placeholder="감상을 작성해보세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </article>
      <footer className="fixed bottom-0 left-0 w-full bg-secondary p-4">
        <div className="flex w-full items-center justify-end px-5">
          <Button
            type="submit"
            form="postForm"
            className="w-24 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장중..." : "저장"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
