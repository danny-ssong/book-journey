'use client'

import { useSearchParams } from 'next/navigation'

import Loading from '@/components/common/Loading'

import { useGetBook } from '@/api/client/book.queries'

import PostForm, { postFormDefaults } from '../_components/PostForm'
import { useCreatePostSubmit } from '../_hooks/usePostFormSubmit'

export default function NewPostPage() {
  const params = useSearchParams()
  const isbn = params.get('isbn')
  const { data: book, isLoading: isBookLoading } = useGetBook(isbn || '')
  const handleSubmit = useCreatePostSubmit()

  if (isBookLoading) return <Loading />

  return <PostForm defaultValues={postFormDefaults(undefined, book)} onSubmit={handleSubmit} />
}
