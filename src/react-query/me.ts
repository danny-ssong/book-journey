import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, logout, updateProfile } from "@/api/me";
import { revalidatePath } from "@/api/revalidatePath";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateProfileData: UpdateProfile) =>
      updateProfile(updateProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
