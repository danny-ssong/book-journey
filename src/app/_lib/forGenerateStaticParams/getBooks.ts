"use server";
import { BookWithPosts } from "@/types/book";

export async function getBooks(): Promise<BookWithPosts[] | undefined> {
  //generate static params는 cookie나 header에 접근하면 안되는데, supabase/ssr의 server에서 사용하는 supabase client는 이걸 사용하고 있어서. cleint걸로 대신 사용

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
