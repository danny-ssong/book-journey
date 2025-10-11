import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";

import Rating from "@/components/post/Rating";
import { Card } from "@/components/ui/card";

import { PostWithBook } from "@/types/post";

import MyPostActionButtons from "../../app/manage/posts/_components/MyPostActionButtons";
import AuthorName from "./AuthorName";
import BookThumbnail from "./BookThumbnail";
import BookTitle from "./BookTitle";
import DateViewer from "./DateViewer";
import PostContent from "./PostContent";
import PostTitle from "./PostTitle";
import UserName from "./UserName";

type Props = {
  post: PostWithBook;
};

export default function PostCard({ post }: Props) {
  return (
    <Card className="h-[210px]">
      <article className="flex h-full gap-4 p-4">
        <BookThumbnail
          title={post.book.title}
          thumbnailUrl={post.book.thumbnailUrl}
        />
        <section className="flex min-w-0 flex-1 flex-col">
          <header>
            <div className="flex items-center gap-2">
              <BookTitle title={post.book.title} isbn={post.book.isbn} asLink />
              <AuthorName authorName={post.book.author.name} asLink />
            </div>
            <DateViewer date={post.updatedAt} label="최근 수정일" />
            <PostTitle post={post} asLink />
          </header>

          <div className="mt-auto flex items-center gap-2">
            <UserName
              userName={post.user.profile.nickname}
              userId={post.user.id}
              asLink
            />
            <Rating rating={post.rating!} />
          </div>

          <PostContent post={post} maxLines={3} asLink />
        </section>
      </article>
    </Card>
  );
}
