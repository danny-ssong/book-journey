import { Book } from "@/types/book";
import dayjs from "dayjs";
import Link from "next/link";

export default function BookDetail({ book }: { book: Book }) {
  return (
    <div className="flex px-4 py-4">
      <div className="mr-4 h-[180px] w-[120px]">
        <img
          src={book.thumbnailUrl}
          alt={"thumbnail"}
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex-1">
        <h3>{book.title}</h3>
        <p>{book.author.name}</p>
        <p>
          {book.publisher} {dayjs(book.publishedAt).format("YYYY-MM-DD")}
        </p>
        <p>{book.contents}</p>
      </div>
    </div>
  );
}
