'use client'

import { notFound, useParams, useRouter } from 'next/navigation'

import { toast } from 'sonner'

import Loading from '@/components/common/Loading'

import { useGetPost, useUpdatePost } from '@/api/client/post.queries'
import { CreatePost } from '@/schemas/post'

import PostForm, { postFormDefaults } from '../../_components/PostForm'

export default function PostEditPage() {
  const router = useRouter()
  const params = useParams()
  const { data: post, isLoading } = useGetPost(params.postId as string)
  const { mutateAsync: updatePost } = useUpdatePost()

  if (isLoading) return <Loading text="게시글을 불러오는 중..." />
  if (!post) return notFound()

  const handleSubmit = async (values: CreatePost) => {
    try {
      await updatePost({ id: post.id, updatePostData: values })
      router.push('/manage/posts')
    } catch (error) {
      const description = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      toast.error('포스트 저장 실패', { description })
    }
  }

  return <PostForm defaultValues={postFormDefaults(post, post.book)} onSubmit={handleSubmit} />
}
