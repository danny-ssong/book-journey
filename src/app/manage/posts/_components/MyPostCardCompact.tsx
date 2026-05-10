import AuthorName from "@/components/post/AuthorName";
import BookTitle from "@/components/post/BookTitle";
import DateViewer from "@/components/post/DateViewer";
import PostContent from "@/components/post/PostContent";
import PostTitle from "@/components/post/PostTitle";
import Rating from "@/components/post/Rating";

import { PostWithBook } from "@/types/post";

import MyPostActionButtons from "./MyPostActionButtons";

export default function MyPostCardCompact({ post }: { post: PostWithBook }) {
  return (
    <article className="group flex-col border-b-2 px-4 py-4 last:border-none">
      <header className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <BookTitle
            title={post.book.title}
            isbn={post.book.isbn}
            asLink
            className="max-w-80 truncate text-base"
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

      <PostContent post={post} asLink maxLines={1} />
    </article>
  );
}
