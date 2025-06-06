import { PostWithBook } from "@/types/post";
import { fetchWithAuth } from "@/utils/auth";
import { cookies } from "next/headers";

export default async function getPost(
  postId: string,
): Promise<PostWithBook | undefined> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
      {
        headers: {
          Cookie: cookies().toString(),
        },
      },
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
