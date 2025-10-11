import AuthorName from "@/components/post/AuthorName";
import BookThumbnail from "@/components/post/BookThumbnail";
import BookTitle from "@/components/post/BookTitle";
import DateViewer from "@/components/post/DateViewer";

import { Book } from "@/types/book";

export default function BookItem({ book }: { book: Book }) {
  return (
    <article className="mb-6 flex gap-4 overflow-hidden py-2">
      <BookThumbnail title={book.title} thumbnailUrl={book.thumbnailUrl} />
      <div className="flex flex-1 flex-col gap-2">
        <BookTitle
          title={book.title}
          isbn={book.isbn}
          asLink
          className="font-semibold"
        />
        <AuthorName
          authorName={book.author.name}
          asLink
          className="text-black"
        />
        <p className="text-sm">{book.publisher}</p>
        <DateViewer date={book.publishedAt} label="출판일" />
        <p className="line-clamp-3 text-sm">{book.contents}</p>
      </div>
    </article>
  );
}
