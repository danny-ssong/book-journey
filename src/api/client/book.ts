import { getBookByIsbn, getBooks as getBooksAction, searchBooks as searchBooksAction } from '@/actions/books'
import { Book, SearchedBook } from '@/types/book'

interface SearchBookResponse {
  documents: SearchedBook[]
  meta: { is_end: boolean; pageable_count: number; total_count: number }
}

export async function searchBooks(query: string, size: number = 10, page: number = 1): Promise<SearchBookResponse> {
  return searchBooksAction(query, size, page)
}

export async function getBook(isbn: string): Promise<Book> {
  return getBookByIsbn(isbn)
}

export async function getBooks(): Promise<Book[]> {
  return getBooksAction()
}
