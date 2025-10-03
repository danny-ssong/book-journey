import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getUserPosts, updatePost } from "@/api/post";
import { Post } from "@/types/post";

export function useUserPosts(userId: string, take: number = 9999) {
  return useQuery({
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

export function useCreatePost(createPostDto: CreatePostDto) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createPost(createPostDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
}

export function useUpdatePost(postId: number, updatePostDto: CreatePostDto) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updatePost(postId, updatePostDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
}
