import { Book, SearchedBook } from "@/types/book";

interface SearchBookResponse {
  documents: SearchedBook[];
  meta: { is_end: boolean; pageable_count: number; total_count: number };
}

export async function searchBooks(
  query: string,
  size: number = 10,
  page: number = 1,
): Promise<SearchBookResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books/search?query=${query}&size=${size}&page=${page}`,
  );

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getBook(isbn: string): Promise<Book> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books/${isbn}`,
  );

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books`);

  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}
