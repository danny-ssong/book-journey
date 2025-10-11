import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost, deletePost, getUserPosts, updatePost } from "@/api/post";
import { CreatePost, UpdatePost } from "@/schemas/post";
import { Post } from "@/types/post";

export function useUserPosts(userId: string, take: number = 9999) {
  return useSuspenseQuery({
    queryKey: ["all-posts", userId],
    queryFn: () => getUserPosts(take, userId),
  });
}

export function useDeletePost(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createPostData: CreatePost) => createPost(createPostData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatePostData,
    }: {
      id: number;
      updatePostData: UpdatePost;
    }) => updatePost(id, updatePostData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
