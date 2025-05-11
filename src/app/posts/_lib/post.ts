import { Book } from "@/types/book";
import { PaginationResponse } from "@/types/pagination-response";
import { Post } from "@/types/post";
import { PostWithBook } from "@/types/post";
import { fetchWithAuth } from "@/utils/auth";
import { revalidatePath } from "@/app/_lib/revalidatePath";
type CreatePostDto = {
  title: string;
  content: string;
  rating: number;
  startDate: Date;
  isPrivate: boolean;
  book: CreateBookDto;
};

type CreateBookDto = {
  author: string;
  isbn: string;
  publishedAt: Date;
  title: string;
  thumbnailUrl: string;
  contents: string;
  url: string;
  publisher: string;
};

export async function createPost(
  createPostDto: CreatePostDto,
): Promise<PostWithBook | undefined> {
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

export async function updatePost(id: number, updatePostDto: CreatePostDto) {
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

    await revalidatePath(`/posts/${id}`);

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
    if (!res.ok) throw new Error("Failed to delete post");

    await revalidatePath(`/posts/${postId}`);

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
    if (!res.ok) throw new Error("Failed to fetch user posts");

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
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts?take=${take}&order=updatedAt_DESC&cursor=${cursor ?? ""}`,
    );
    if (!res.ok) throw new Error("Failed to fetch posts");

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
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/user/me?take=${take}&order=updatedAt_DESC&cursor=${cursor ?? ""}`,
    );
    if (!res.ok) throw new Error("Failed to fetch my posts");

    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    throw error;
  }
}

export async function getPost(
  postId: string,
): Promise<PostWithBook | undefined> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`[getPost] Failed to fetch post// ${errorData.message}`);
    }

    const post = await res.json();
    return post;
  } catch (error: any) {
    console.error(error);
    return;
  }
}
