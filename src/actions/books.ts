'use server'

import { type SearchBooksResponse, findKakaoBookByIsbn, searchKakaoBooks } from '@/lib/kakao'
import { prisma } from '@/lib/prisma'
import type { Book, BookWithPosts } from '@/types/book'

/**
 * Kakao Book API 검색. NestJS의 GET /books/search 대체.
 */
export async function searchBooks(query: string, size = 10, page = 1): Promise<SearchBooksResponse> {
  return searchKakaoBooks(query, size, page)
}

/**
 * ISBN으로 단일 도서 조회. NestJS는 Kakao API에서 직접 검색하여 반환했으므로 동일 동작 유지.
 */
export async function getBookByIsbn(isbn: string): Promise<Book> {
  const book = await findKakaoBookByIsbn(isbn)
  if (!book) {
    throw new Error('Book not found')
  }
  return book
}

/**
 * 우리 DB에 저장된 모든 도서. NestJS의 GET /books 대체.
 */
export async function getBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
  return books.map((b) => ({
    isbn: b.isbn,
    title: b.title,
    contents: b.contents,
    url: b.url,
    publisher: b.publisher,
    thumbnailUrl: b.thumbnailUrl,
    publishedAt: b.publishedAt,
    author: { id: b.author?.id, name: b.author?.name ?? '' },
  }))
}

/**
 * ISBN으로 책 + 그 책에 달린 공개 post 목록 조회. NestJS의 GET /posts/book/:isbn 대체.
 * 비공개 post는 Phase 3에서 시청자 권한과 함께 정교화한다 (지금은 단순 isPrivate=false 필터).
 */
export async function getBookWithPosts(isbn: string): Promise<BookWithPosts> {
  const book = await prisma.book.findUnique({
    where: { isbn },
    include: {
      author: true,
      posts: {
        where: { deletedAt: null, isPrivate: false },
        include: {
          book: { include: { author: true } },
          profile: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!book) {
    // DB에 책이 없으면 Kakao에서 가져와 응답 (post는 비어있음)
    const kakao = await findKakaoBookByIsbn(isbn)
    if (!kakao) throw new Error('Book not found')
    return { ...kakao, posts: [] }
  }

  return {
    isbn: book.isbn,
    title: book.title,
    contents: book.contents,
    url: book.url,
    publisher: book.publisher,
    thumbnailUrl: book.thumbnailUrl,
    publishedAt: book.publishedAt,
    author: { id: book.author?.id, name: book.author?.name ?? '' },
    posts: book.posts.map((p) => ({
      id: p.id,
      title: p.title ?? '',
      content: p.content ?? '',
      rating: p.rating,
      startDate: p.startDate,
      isPrivate: p.isPrivate,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      book: {
        isbn: p.book?.isbn ?? '',
        title: p.book?.title ?? '',
        contents: p.book?.contents ?? '',
        url: p.book?.url ?? '',
        publisher: p.book?.publisher ?? '',
        thumbnailUrl: p.book?.thumbnailUrl ?? '',
        publishedAt: p.book?.publishedAt ?? new Date(),
        author: {
          id: p.book?.author?.id,
          name: p.book?.author?.name ?? '',
        },
      },
      user: p.profile
        ? {
            id: p.profile.userId,
            profile: {
              id: p.profile.id,
              nickname: p.profile.nickname,
              avatarUrl: p.profile.avatarUrl ?? '',
              bio: p.profile.bio ?? '',
              userId: p.profile.userId,
              mostReadAuthors: [],
            },
          }
        : {
            id: '',
            profile: {
              id: 0,
              nickname: '',
              avatarUrl: '',
              bio: '',
              userId: '',
              mostReadAuthors: [],
            },
          },
    })),
  }
}
