import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, logout, updateProfile } from "@/api/me";
import { UpdateProfile } from "@/types/user";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
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
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateProfileData: UpdateProfile) =>
      updateProfile(updateProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
