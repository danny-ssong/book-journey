import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, logout, updateProfile } from "@/api/client/me";
import { UpdateProfile } from "@/types/user";

export const meKeys = {
  all: ["me"] as const,
};

export function useGetMe() {
  return useQuery({
    queryKey: meKeys.all,
    queryFn: () => getMe(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.all });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateProfileData: UpdateProfile) =>
      updateProfile(updateProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.all });
    },
  });
}
