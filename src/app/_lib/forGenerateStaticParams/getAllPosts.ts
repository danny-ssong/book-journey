"use server";

import { PostWithBook } from "@/types/post";

export async function getAllPosts(): Promise<PostWithBook[] | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts`,
    );

    if (!res.ok) throw new Error("Failed to fetch all posts");

    const posts = await res.json();
    return posts;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
