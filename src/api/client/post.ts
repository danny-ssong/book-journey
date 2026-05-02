import {
  createPost as createPostAction,
  deletePost as deletePostAction,
  getMyPosts as getMyPostsAction,
  getPost as getPostAction,
  getPosts as getPostsAction,
  getPostsByUser as getPostsByUserAction,
  updatePost as updatePostAction,
} from "@/actions/posts";
import { CreatePost, UpdatePost } from "@/schemas/post";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";

export async function createPost(
  createPostData: CreatePost,
): Promise<PostWithBook> {
  return createPostAction(createPostData);
}

export async function updatePost(
  id: number,
  updatePostData: UpdatePost,
): Promise<PostWithBook> {
  return updatePostAction(id, updatePostData);
}

export async function deletePost(postId: number) {
  return deletePostAction(postId);
}

export async function getUserPosts(
  take: number,
  userId: string,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  return getPostsByUserAction(userId, take, cursor);
}

export async function getPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  return getPostsAction(take, cursor);
}

export async function getMyPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  return getMyPostsAction(take, cursor);
}

export async function getPost(postId: string): Promise<PostWithBook> {
  return getPostAction(postId);
}
