import AuthorName from "@/components/post/AuthorName";
import BookThumbnail from "@/components/post/BookThumbnail";
import BookTitle from "@/components/post/BookTitle";
import DateViewer from "@/components/post/DateViewer";

import { Book } from "@/types/book";

export default function BookInfo({ book }: { book: Book }) {
  return (
    <div className="flex px-4 py-4">
      <div className="flex">
        <BookThumbnail
          title={book.title}
          thumbnailUrl={book.thumbnailUrl}
          className="mr-4"
        />
        <div className="flex-1">
          <BookTitle
            title={book.title}
            isbn={book.isbn}
            className="font-semibold"
          />
          <AuthorName authorName={book.author.name} asLink />
          <p className="text-sm text-muted-foreground">{book.publisher}</p>
          <DateViewer date={book.publishedAt} label="출판일" />
          <p className="line-clamp-4 text-sm">{book.contents}</p>
        </div>
      </div>
    </div>
  );
}
