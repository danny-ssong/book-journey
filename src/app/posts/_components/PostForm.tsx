'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CreatePost, createPostSchema } from '@/schemas/post'
import { Book } from '@/types/book'
import { Post } from '@/types/post'
import { getFirstZodErrorMessage } from '@/utils/zod-error-util'

import { useBeforeunload } from '../_hooks/useBeforeunload'
import ContentInput from './form-fields/ContentInput'
import PostFormBookSearchBar from './form-fields/PostFormBookSearchBar'
import PostFormFooter from './form-fields/PostFormFooter'
import PrivacySelector from './form-fields/PrivacySelector'
import RatingSelector from './form-fields/RatingSelector'
import ReadDatePicker from './form-fields/ReadDatePicker'
import TitleInput from './form-fields/TitleInput'

// 서버 도메인 타입(Post/Book)을 폼 입력 타입(CreatePost)으로 변환하는 유일한 지점
export function postFormDefaults(initPost?: Post, initBook?: Book): CreatePost {
  return {
    title: initPost?.title ?? '',
    content: initPost?.content ?? '',
    rating: initPost?.rating ?? 5,
    startDate: initPost?.startDate ? new Date(initPost.startDate) : new Date(),
    isPrivate: initPost?.isPrivate ?? false,
    book: initBook
      ? {
          ...initBook,
          author: initBook.author.name,
          publishedAt: new Date(initBook.publishedAt),
        }
      : null,
  }
}

type PostFormProps = {
  defaultValues: CreatePost
  onSubmit: (values: CreatePost) => Promise<void> | void
  warnOnUnload?: boolean
}

export default function PostForm({ defaultValues, onSubmit, warnOnUnload = true }: PostFormProps) {
  const methods = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  useBeforeunload(warnOnUnload && isDirty)

  const handleValidationError = (errors: FieldErrors<CreatePost>) => {
    const message = getFirstZodErrorMessage(errors)
    if (message) toast.error(message)
  }

  return (
    <FormProvider {...methods}>
      <form className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit, handleValidationError)}>
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
  )
}
