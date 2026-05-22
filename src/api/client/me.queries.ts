import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getMe, logout, updateProfile } from '@/api/client/me'
import { UpdateProfile } from '@/types/user'

export const meKeys = {
  all: ['me'] as const,
}

export function useGetMe() {
  return useQuery({
    queryKey: meKeys.all,
    queryFn: () => getMe(),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // signOut 응답으로 쿠키가 비워진 상태에서 풀 리로드.
      // React Query 캐시·컴포넌트 상태·SSR 트리를 한 번에 깨끗이 초기화한다.
      window.location.href = '/'
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateProfileData: UpdateProfile) => updateProfile(updateProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.all })
    },
  })
}
