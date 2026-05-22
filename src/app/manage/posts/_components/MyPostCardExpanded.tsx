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
      <article className="group flex gap-3 p-4 sm:gap-4">
        <BookThumbnail
          title={post.book.title}
          thumbnailUrl={post.book.thumbnailUrl}
          className="sm:h-[174px] sm:w-[120px]"
        />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <BookTitle
                title={post.book.title}
                isbn={post.book.isbn}
                asLink
                className="line-clamp-1 max-w-36 text-base sm:max-w-64"
              />
              <AuthorName authorName={post.book.author.name} asLink />
            </div>
            <div className="hidden sm:block">
              <Rating rating={post.rating!} />
            </div>
          </header>

          <div className="flex items-center gap-2">
            <DateViewer
              date={post.createdAt}
              label="작성일"
              className="text-xs"
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
              <span aria-hidden="true">·</span>
              <Rating rating={post.rating!} size="xs" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <PostTitle post={post} asLink />
            <MyPostActionButtons postId={post.id} />
          </div>

          <PostContent
            post={post}
            asLink
            maxLines={3}
            className="sm:line-clamp-4"
          />
        </section>
      </article>
    </Card>
  );
}

export default MyPostCardExpanded;
