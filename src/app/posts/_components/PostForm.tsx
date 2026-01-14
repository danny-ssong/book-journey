"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreatePost, useUpdatePost } from "@/react-query/post";
import { CreatePost, createPostSchema } from "@/schemas/post";
import { Book } from "@/types/book";
import { Post } from "@/types/post";
import { getFirstZodErrorMessage } from "@/utils/zod-error-util";

import { useBeforeunload } from "../_hooks/useBeforeunload";
import ContentInput from "./form-fields/ContentInput";
import PostFormBookSearchBar from "./form-fields/PostFormBookSearchBar";
import PostFormFooter from "./form-fields/PostFormFooter";
import PrivacySelector from "./form-fields/PrivacySelector";
import RatingSelector from "./form-fields/RatingSelector";
import ReadDatePicker from "./form-fields/ReadDatePicker";
import TitleInput from "./form-fields/TitleInput";

export default function PostForm({
  initPost,
  initBook,
}: {
  initPost?: Post;
  initBook?: Book;
}) {
  const router = useRouter();
  const { mutateAsync: createPostMutation } = useCreatePost();
  const { mutateAsync: updatePostMutation } = useUpdatePost();

  const methods = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: initPost?.title ?? "",
      content: initPost?.content ?? "",
      rating: initPost?.rating ?? 5,
      startDate: initPost?.startDate
        ? new Date(initPost.startDate)
        : new Date(),
      isPrivate: initPost?.isPrivate ?? false,
      book: initBook
        ? {
            ...initBook,
            author: initBook.author.name,
            publishedAt: new Date(initBook.publishedAt),
          }
        : null,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useBeforeunload(isDirty);

  const createOrUpdatePost = async (post: CreatePost) => {
    try {
      await (initPost
        ? updatePostMutation({ id: initPost.id, updatePostData: post })
        : createPostMutation(post));

      router.push("/manage/posts");
    } catch (error: any) {
      console.error(error);
      alert(`포스트 저장 실패: ${error?.message}`);
    }
  };

  const handleSubmitError = (error: FieldErrors<CreatePost>) => {
    const errorMessage = getFirstZodErrorMessage(error);
    if (errorMessage) toast.error(errorMessage);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full flex-col"
        onSubmit={handleSubmit(createOrUpdatePost, handleSubmitError)}
      >
        <article className="mb-20 flex h-full flex-col gap-4">
          <PostFormBookSearchBar />
          <PrivacySelector />
          <div className="flex justify-between">
            <RatingSelector />
            <ReadDatePicker />
          </div>
          <TitleInput />
          <ContentInput />
        </article>
        <PostFormFooter />
      </form>
    </FormProvider>
  );
}
