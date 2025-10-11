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
      <header className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <BookTitle
            title={post.book.title}
            isbn={post.book.isbn}
            asLink
            className="max-w-80 truncate"
          />
          <AuthorName authorName={post.book.author.name} asLink />
        </div>
        <DateViewer date={post.updatedAt} label="최근 수정일" />
      </header>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <Rating rating={post.rating!} />
          <PostTitle post={post} asLink />
        </div>
        <MyPostActionButtons postId={post.id} />
      </div>

      <PostContent post={post} asLink maxLines={1} />
    </article>
  );
}
