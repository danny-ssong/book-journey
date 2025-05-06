import { Book } from "@/types/book";
import { PaginationResponse } from "@/types/pagination-response";
import { Post } from "@/types/post";
import { PostWithBook } from "@/types/post";
import { fetchWithAuth } from "@/utils/auth";

export async function createPost(
  book: Partial<Book>,
  post: Partial<Post>,
): Promise<PostWithBook | undefined> {
  const createPostDto = {
    ...post,
    book,
  };

  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPostDto),
      },
    );
    if (!res.ok) throw new Error("Failed to create post");

    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}

export async function updatePost(
  id: number,
  book: Partial<Book>,
  post: Partial<Post>,
) {
  const updatePostDto = {
    ...post,
    book,
  };
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePostDto),
      },
    );
    if (!res.ok) throw new Error("Failed to update post");

    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}

export async function deletePost(postId: number) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
      {
        method: "DELETE",
      },
    );
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}

export async function getUserPosts(
  take: number,
  userId: string,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/user/${userId}?take=${take}&cursor=${cursor ?? ""}`,
    );
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    throw error;
  }
}
export async function getPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts?take=${take}&cursor=${cursor ?? ""}`,
    );
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    throw error;
  }
}

export async function getMyPosts(
  take: number,
  cursor?: string,
): Promise<PaginationResponse<PostWithBook>> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/user/me?take=${take}&cursor=${cursor ?? ""}`,
    );
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    throw error;
  }
}
