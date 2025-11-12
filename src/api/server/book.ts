"use server";

import { Book, BookWithPosts } from "@/types/book";

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books`);
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getBookWithPostsOnServer(
  isbn: string,
): Promise<BookWithPosts> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/book/${isbn}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}
