'use client'

import { notFound, useParams } from 'next/navigation'

import Loading from '@/components/common/Loading'

import { useGetPost } from '@/api/client/post.queries'

import PostForm, { postFormDefaults } from '../../_components/PostForm'
import { useUpdatePostSubmit } from '../../_hooks/usePostFormSubmit'

export default function PostEditPage() {
  const params = useParams()
  const { data: post, isLoading } = useGetPost(params.postId as string)
  const submit = useUpdatePostSubmit()

  if (isLoading) return <Loading text="게시글을 불러오는 중..." />
  if (!post) return notFound()

  return <PostForm defaultValues={postFormDefaults(post, post.book)} onSubmit={(values) => submit(post.id, values)} />
}
