"use server";
import { BookWithPosts } from "@/types/book";

export async function getBooks(): Promise<BookWithPosts[] | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books`,
    );

    if (!res.ok) throw new Error("Failed to fetch books");

    const books = await res.json();
    return books;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
