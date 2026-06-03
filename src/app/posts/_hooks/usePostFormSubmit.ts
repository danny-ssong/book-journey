'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { toast } from 'sonner'

import { useCreatePost, useUpdatePost } from '@/api/client/post.queries'
import { CreatePost } from '@/schemas/post'

// 폼 제출 실패 시 공통 토스트 처리
function notifyPostSubmitError(error: unknown) {
  const description = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
  toast.error('포스트 저장 실패', { description })
}

// PostForm 의 onSubmit 으로 그대로 넘길 수 있는 제출 함수를 반환한다.
// react-query mutation 호출 + 성공 시 라우팅 + 실패 시 토스트까지 캡슐화.
export function useCreatePostSubmit() {
  const router = useRouter()
  const { mutateAsync } = useCreatePost()

  return useCallback(
    async (values: CreatePost) => {
      try {
        await mutateAsync(values)
        router.push('/manage/posts')
      } catch (error) {
        notifyPostSubmitError(error)
      }
    },
    [mutateAsync, router],
  )
}

// 수정은 게시글 id 가 페이지 측에서 비동기 로딩 이후에야 확정되므로,
// 반환 함수가 id 를 인자로 받는다. 페이지는 post.id 를 바인딩해 PostForm 에 넘긴다.
export function useUpdatePostSubmit() {
  const router = useRouter()
  const { mutateAsync } = useUpdatePost()

  return useCallback(
    async (id: number, values: CreatePost) => {
      try {
        await mutateAsync({ id, updatePostData: values })
        router.push('/manage/posts')
      } catch (error) {
        notifyPostSubmitError(error)
      }
    },
    [mutateAsync, router],
  )
}
