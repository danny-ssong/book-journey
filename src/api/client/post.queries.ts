import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPost,
  deletePost,
  getPost,
  getUserPosts,
  updatePost,
} from "@/api/client/post";
import { CreatePost, UpdatePost } from "@/schemas/post";

export const postKeys = {
  all: ["post"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  myPosts: () => [...postKeys.lists(), "my"] as const,
  userPosts: (userId: string) => [...postKeys.lists(), "user", userId] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (postId: string) => [...postKeys.details(), postId] as const,
  // infinite queries
  infinite: () => [...postKeys.all, "infinite"] as const,
  infiniteAll: () => [...postKeys.infinite(), "all"] as const,
  infiniteMy: () => [...postKeys.infinite(), "my"] as const,
  infiniteUser: (userId: string) =>
    [...postKeys.infinite(), "user", userId] as const,
};

export function useGetPost(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
  });
}

export function useUserPosts(userId: string, take: number = 9999) {
  return useQuery({
    queryKey: postKeys.userPosts(userId),
    queryFn: () => getUserPosts(take, userId),
  });
}

export function useDeletePost(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.infinite() });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createPostData: CreatePost) => createPost(createPostData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.infinite() });
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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id.toString()) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.infinite() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
