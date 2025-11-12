import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  createPost,
  deletePost,
  getPost,
  getUserPosts,
  updatePost,
} from "@/api/post";
import { CreatePost, UpdatePost } from "@/schemas/post";

export function useGetPost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
}

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
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createPostData: CreatePost) => createPost(createPostData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
