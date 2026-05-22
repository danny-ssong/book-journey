'use client'

import Link from 'next/link'

import AuthorName from '@/components/post/AuthorName'
import BookTitle from '@/components/post/BookTitle'
import DateViewer from '@/components/post/DateViewer'
import PostContent from '@/components/post/PostContent'
import PostTitle from '@/components/post/PostTitle'
import Rating from '@/components/post/Rating'
import UserName from '@/components/post/UserName'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { useGetMe } from '@/api/client/me.queries'
import { PostWithBook } from '@/types/post'

export default function PostViewer({ post }: { post: PostWithBook }) {
  const { data: user } = useGetMe()
  const isOwner = post.user.id === user?.id

  return (
    <article>
      <Card>
        <CardHeader className="gap-3">
          <div className="flex items-center gap-2">
            <BookTitle title={post.book.title} isbn={post.book.isbn} asLink />
            <AuthorName authorName={post.book.author.name} asLink />
          </div>
          <div className="flex flex-col gap-1">
            <UserName userName={post.user.profile.nickname} userId={post.user.id} asLink />
            <div className="flex items-center gap-3">
              <Rating rating={post.rating} />
              <DateViewer date={post.startDate} label="읽은 날짜" format="YYYY-MM" />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex min-h-[600px] flex-col p-6">
          <PostTitle post={post} className="mb-4 text-xl font-semibold" />
          <PostContent post={post} className="whitespace-pre-line" />
        </CardContent>
      </Card>
      {isOwner && (
        <footer className="fixed bottom-0 left-0 flex w-full justify-end bg-secondary p-4">
          <Link href={`/posts/edit/${post.id}`}>
            <Button className="w-24 rounded-full">수정</Button>
          </Link>
        </footer>
      )}
    </article>
  )
}
