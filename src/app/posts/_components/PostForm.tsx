'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CreatePost, createPostSchema } from '@/schemas/post'
import { Book } from '@/types/book'
import { Post } from '@/types/post'
import { getFirstZodErrorMessage } from '@/utils/zod-error-util'

import { useFormUnloadGuard } from '../_hooks/useFormUnloadGuard'
import ContentInput from './form-fields/ContentInput'
import PostFormBookSearchBar from './form-fields/PostFormBookSearchBar'
import PostFormFooter from './form-fields/PostFormFooter'
import PrivacySelector from './form-fields/PrivacySelector'
import RatingSelector from './form-fields/RatingSelector'
import ReadDatePicker from './form-fields/ReadDatePicker'
import TitleInput from './form-fields/TitleInput'

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
  onSubmit: (values: CreatePost) => Promise<unknown>
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

  const { bypass } = useFormUnloadGuard({ enabled: warnOnUnload && isDirty })

  const handleValidationError = (errors: FieldErrors<CreatePost>) => {
    const message = getFirstZodErrorMessage(errors)
    if (message) toast.error(message)
  }

  // 정상 submit 직전에 guard 를 우회한다. onSubmit 이 router.push 를 호출하더라도
  // confirm 이 뜨지 않도록 보장하고, 실패 시 finally 에서 가드 복귀.
  const submitWithGuardBypass = async (values: CreatePost) => {
    bypass()
    try {
      await onSubmit(values)
    } finally {
      bypass(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="flex h-full flex-col" onSubmit={handleSubmit(submitWithGuardBypass, handleValidationError)}>
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
