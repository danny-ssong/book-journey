import { cookies } from "next/headers";

import { PostWithBook } from "@/types/post";

export async function getPost(
  postId: string,
): Promise<PostWithBook | undefined> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/${postId}`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    },
  );

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}
