import dayjs from "dayjs";

import AuthorName from "@/components/post/AuthorName";
import BookThumbnail from "@/components/post/BookThumbnail";
import BookTitle from "@/components/post/BookTitle";
import DateViewer from "@/components/post/DateViewer";
import PostContent from "@/components/post/PostContent";
import PostTitle from "@/components/post/PostTitle";
import Rating from "@/components/post/Rating";
import { Card } from "@/components/ui/card";

import { PostWithBook } from "@/types/post";

import MyPostActionButtons from "./MyPostActionButtons";

type Props = {
  post: PostWithBook;
};

function MyPostCardExpanded({ post }: Props) {
  return (
    <Card>
      <article className="group flex gap-4 p-4">
        <BookThumbnail
          title={post.book.title}
          thumbnailUrl={post.book.thumbnailUrl}
        />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex justify-between">
            <div className="flex items-center gap-2">
              <BookTitle title={post.book.title} isbn={post.book.isbn} asLink />
              <AuthorName authorName={post.book.author.name} asLink />
            </div>
            <DateViewer date={post.updatedAt} label="최근 수정일" />
          </header>

          <div className="mb-2 flex items-center justify-between">
            <div>
              <PostTitle post={post} asLink />
              <Rating rating={post.rating!} />
            </div>
            <MyPostActionButtons postId={post.id} />
          </div>
          <PostContent post={post} asLink maxLines={3} className="mt-auto" />
        </section>
      </article>
    </Card>
  );
}

export default MyPostCardExpanded;
