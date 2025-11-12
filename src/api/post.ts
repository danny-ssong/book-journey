import dayjs from "dayjs";

import { fetchWithAuth } from "@/api/auth";
import { CreatePost, UpdatePost } from "@/schemas/post";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";

import { revalidatePath } from "./server/revalidatePath";

export async function createPost(
  createPostData: CreatePost,
): Promise<PostWithBook> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPostData),
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function updatePost(
  id: number,
  updatePostData: UpdatePost,
): Promise<PostWithBook> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePostData),
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  await revalidatePath(`/posts/${id}`);
  return res.json();
}

export async function deletePost(postId: number) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  await revalidatePath(`/posts/${postId}`);

  return res.json();
}

export async function getUserPosts(
  take: number,
  userId: string,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/user/${userId}?take=${take}&cursor=${cursor ?? ""}`,
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts?take=${take}&order=updatedAt_DESC&cursor=${cursor ?? ""}`,
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getMyPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/user/me?take=${take}&order=updatedAt_DESC&cursor=${cursor ?? ""}`,
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getPost(postId: string): Promise<PostWithBook> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
  );

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}
