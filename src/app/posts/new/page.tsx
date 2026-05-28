'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { toast } from 'sonner'

import Loading from '@/components/common/Loading'

import { useGetBook } from '@/api/client/book.queries'
import { useCreatePost } from '@/api/client/post.queries'
import { CreatePost } from '@/schemas/post'

import PostForm, { postFormDefaults } from '../_components/PostForm'

export default function NewPostPage() {
  const router = useRouter()
  const params = useSearchParams()
  const isbn = params.get('isbn')
  const { data: book, isLoading: isBookLoading } = useGetBook(isbn || '')
  const { mutateAsync: createPost } = useCreatePost()

  const handleSubmit = async (values: CreatePost) => {
    try {
      await createPost(values)
      router.push('/manage/posts')
    } catch (error) {
      const description = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      toast.error('포스트 저장 실패', { description })
    }
  }

  if (isBookLoading) return <Loading />

  return <PostForm defaultValues={postFormDefaults(undefined, book)} onSubmit={handleSubmit} />
}
