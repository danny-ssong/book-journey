import { PostWithBook } from "@/types/post";
import { fetchWithAuth } from "@/utils/auth";

export default async function getPost(
  postId: string,
): Promise<PostWithBook | undefined> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
    );

    if (!res.ok) throw new Error("Failed to fetch post");

    const post = await res.json();
    return post;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
