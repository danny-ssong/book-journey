import dayjs from 'dayjs'

import Rating from '@/components/post/Rating'
import { Card } from '@/components/ui/card'

import { PostWithBook } from '@/types/post'

import AuthorName from './AuthorName'
import BookThumbnail from './BookThumbnail'
import BookTitle from './BookTitle'
import PostContent from './PostContent'
import PostTitle from './PostTitle'
import UserName from './UserName'

type Props = {
  post: PostWithBook
}

export default function PostCard({ post }: Props) {
  return (
    <Card className="h-auto sm:h-[210px]">
      <article className="flex h-full gap-3 p-4 sm:gap-4">
        <BookThumbnail title={post.book.title} thumbnailUrl={post.book.thumbnailUrl} className="sm:h-[174px] sm:w-[120px]" />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <BookTitle title={post.book.title} isbn={post.book.isbn} asLink className="max-w-40 truncate text-base sm:max-w-80" />
              <AuthorName authorName={post.book.author.name} asLink />
            </div>
            <div className="hidden sm:block">
              <Rating rating={post.rating!} />
            </div>
          </header>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <UserName userName={post.user.profile.nickname} userId={post.user.id} asLink className="text-xs" />
            <span aria-hidden="true">·</span>
            <time dateTime={post.createdAt.toISOString()} aria-label={`작성일 ${dayjs(post.createdAt).format('YYYY년 M월 D일')}`}>
              {dayjs(post.createdAt).format('YYYY-MM-DD')}
            </time>
            <span aria-hidden="true" className="sm:hidden">
              ·
            </span>
            <div className="sm:hidden">
              <Rating rating={post.rating!} size="xs" />
            </div>
          </div>

          <PostTitle post={post} asLink className="mt-2" />

          <PostContent post={post} maxLines={3} asLink className="sm:line-clamp-4" />
        </section>
      </article>
    </Card>
  )
}
