import dayjs from "dayjs";

import { fetchWithAuth } from "@/api/auth";
import { PaginationResponse } from "@/types/pagination-response";
import { CreatePost, PostWithBook, UpdatePost } from "@/types/post";

import { revalidatePath } from "./revalidatePath";

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

export async function getPost(
  postId: string,
): Promise<PostWithBook | undefined> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
  );

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

// ---group by---
export function getGroupByAuthor(posts: PostWithBook[]) {
  const groupedByAuthor = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const author = post.book.author || "Unknown";

      if (!acc[author.name]) acc[author.name] = [];
      acc[author.name].push(post);

      return acc;
    },
    {},
  );

  return Object.entries(groupedByAuthor).map(([author, posts]) => ({
    author,
    posts,
  }));
}

export function getGroupByMonth(posts: PostWithBook[]) {
  const groupedByMonth = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const month = dayjs(post.startDate).format("YYYY-MM"); // 월은 0부터 시작하므로 +1
      if (!acc[month]) acc[month] = [];

      acc[month].push(post);

      return acc;
    },
    {},
  );
  return Object.entries(groupedByMonth).map(([month, posts]) => ({
    month,
    posts,
  }));
}

export function getGroupByYear(posts: PostWithBook[]) {
  const groupedByYear = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const year = dayjs(post.startDate).format("YYYY");
      if (!acc[year]) acc[year] = [];

      acc[year].push(post);

      return acc;
    },
    {},
  );

  return Object.entries(groupedByYear).map(([year, posts]) => ({
    year,
    posts,
  }));
}
