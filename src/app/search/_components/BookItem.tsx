import dayjs from "dayjs";
import Link from "next/link";
import { Book } from "@/types/book";
export default function BookItem({ book }: { book: Book }) {
  return (
    <article className="mb-6 flex gap-4 px-4 py-2">
      <Link href={`/books/${book.isbn}`}>
        <figure className="h-[160px] w-[120px]">
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="overflow-hidden border object-cover"
          />
        </figure>
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-lg font-semibold">
          <Link href={`/books/${book.isbn}`} className="hover:underline">
            {book.title}
          </Link>
        </h2>
        <p>
          <Link
            href={`/search?query=${book.author.name}`}
            className="text-sm hover:underline"
          >
            {book.author.name}
          </Link>
        </p>
        <p className="text-sm">
          {book.publisher} {dayjs(book.publishedAt).format("YYYY-MM-DD")}
        </p>
        <p className="line-clamp-3 text-sm">{book.contents}</p>
      </div>
    </article>
  );
}
