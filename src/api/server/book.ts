"use server";

import { Book, BookWithPosts } from "@/types/book";

import { serverFetch } from "./util/serverFetch";

export async function getBookWithPosts(isbn: string): Promise<BookWithPosts> {
  return serverFetch<BookWithPosts>(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/book/${isbn}`,
  );
}
