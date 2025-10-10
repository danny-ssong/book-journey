import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: () => logout(),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (updateProfileData: UpdateProfile) =>
      updateProfile(updateProfileData),
  });
}
