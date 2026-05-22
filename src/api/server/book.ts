import { getBookWithPosts as getBookWithPostsAction } from '@/actions/books'
import { BookWithPosts } from '@/types/book'

export async function getBookWithPosts(isbn: string): Promise<BookWithPosts> {
  return getBookWithPostsAction(isbn)
}
