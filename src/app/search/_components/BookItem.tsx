import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface BookItemProps {
  book: SearchedBook;
}

export default function BookItem({ book }: BookItemProps) {
  return (
    <article className="px-4 py-2 flex gap-4 mb-6">
      <Link href={`/books/${book.isbn}`}>
        <figure className="w-[120px] h-[160px]">
          <Image
            src={book.thumbnail}
            alt={book.title}
            width={120}
            height={160}
            className="overflow-hidden border object-cover"
          />
        </figure>
      </Link>
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          <Link href={`/books/${book.isbn}`} className="hover:underline">
            {book.title}
          </Link>
        </h2>
        <p>
          <Link href={`/search?query=${book.authors[0]}`} className="text-sm hover:underline">
            {book.authors[0]}
          </Link>
        </p>
        <p className="text-sm">
          {book.publisher} {dayjs(book.datetime).format("YYYY-MM-DD")}
        </p>
        <p className="text-sm line-clamp-3">{book.contents}</p>
      </div>
    </article>
  );
}
