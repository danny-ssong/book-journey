'use client'

import { notFound, useParams, useRouter } from 'next/navigation'

import { toast } from 'sonner'

import Loading from '@/components/common/Loading'

import { useGetPost, useUpdatePost } from '@/api/client/post.queries'
import { CreatePost } from '@/schemas/post'

import PostForm from '../../_components/PostForm'
import { toPostFormValues } from '../../_utils/toPostFormValues'

export default function PostEditPage() {
  const params = useParams()
  const rawPostId = params.postId
  if (!rawPostId || Array.isArray(rawPostId)) return notFound()

  return <PostEditForm postId={rawPostId} />
}

function PostEditForm({ postId }: { postId: string }) {
  const router = useRouter()
  const { data: post, isPending, isError } = useGetPost(postId)
  const { mutateAsync } = useUpdatePost()

  if (isPending) return <Loading text="게시글 불러오는 중..." />

  if (isError) return notFound()

  const handleSubmit = async (values: CreatePost) => {
    try {
      await mutateAsync({ id: post.id, updatePostData: values })
      router.push('/manage/posts')
    } catch (error) {
      const description = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      toast.error('포스트 저장 실패', { description })
    }
  }

  return <PostForm defaultValues={toPostFormValues(post, post.book)} onSubmit={handleSubmit} />
}
