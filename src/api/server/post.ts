import { PostWithBook } from "@/types/post";

import { serverFetch } from "./util/serverFetch";

export async function getPost(postId: string): Promise<PostWithBook> {
  return serverFetch<PostWithBook>(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
  );
}
