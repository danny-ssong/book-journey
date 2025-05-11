import { Book, BookWithPosts } from "@/types/book";

export async function getBookWithPosts(
  isbn: string,
): Promise<BookWithPosts | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/posts/book/${isbn}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch book");

    const book = await res.json();
    return book;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}

export async function getBook(isbn: string): Promise<Book | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books/${isbn}`,
    );
    if (!res.ok) throw new Error("Failed to fetch book");
    const book = await res.json();
    return book;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}

interface SearchBookResponse {
  documents: Book[];
  meta: { is_end: boolean; pageable_count: number; total_count: number };
}

export async function searchBooks(
  query: string,
  size: number = 10,
  page: number = 1,
): Promise<SearchBookResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books/search?query=${query}&size=${size}&page=${page}`,
    );

    if (!res.ok) throw new Error("Failed to search book");

    const response = await res.json();

    return response;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return {
      documents: [],
      meta: { is_end: true, pageable_count: 0, total_count: 0 },
    };
  }
}
