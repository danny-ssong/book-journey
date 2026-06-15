import { CreatePost } from '@/schemas/post'
import { Book } from '@/types/book'
import { Post } from '@/types/post'

export function toPostFormValues(initPost?: Post, initBook?: Book): CreatePost {
  return {
    title: initPost?.title ?? '',
    content: initPost?.content ?? '',
    rating: initPost?.rating ?? 5,
    startDate: initPost?.startDate ? new Date(initPost.startDate) : new Date(),
    isPrivate: initPost?.isPrivate ?? false,
    book: initBook
      ? {
          ...initBook,
          author: initBook.author.name,
          publishedAt: new Date(initBook.publishedAt),
        }
      : null,
  }
}
