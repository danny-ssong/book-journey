"use client";

import Link from "next/link";

import AuthorName from "@/components/post/AuthorName";
import BookTitle from "@/components/post/BookTitle";
import DateViewer from "@/components/post/DateViewer";
import PostContent from "@/components/post/PostContent";
import PostTitle from "@/components/post/PostTitle";
import Rating from "@/components/post/Rating";
import UserName from "@/components/post/UserName";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "@/hooks/useAuth";
import { PostWithBook } from "@/types/post";

export default function PostViewer({ post }: { post: PostWithBook }) {
  const { user } = useAuth();
  const isOwner = post.user.id === user?.id;

  return (
    <article>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookTitle title={post.book.title} isbn={post.book.isbn} asLink />
              <AuthorName authorName={post.book.author.name} asLink />
            </div>
            <DateViewer date={post.startDate} label="읽은 날짜" />
          </div>
          <Rating rating={post.rating} />
          <UserName
            userName={post.user.profile.nickname}
            userId={post.user.id}
            asLink
          />
        </CardHeader>
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
  );
}
