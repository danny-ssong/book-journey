import { Book } from "@/types/book";
import dayjs from "dayjs";

export default function BookDetail({ book }: { book: Book }) {
  return (
    <div className="flex px-4 py-4">
      {/* 모바일 */}
      <div className="flex flex-col sm:hidden">
        <div className="flex">
          <div className="mr-4 h-[180px] w-[120px]">
            <img
              src={book.thumbnailUrl}
              alt={"thumbnail"}
              className="object-cover"
            />
          </div>
          <div className="sm:hidden">
            <h3>{book.title}</h3>
            <p>{book.author.name}</p>
            <p>
              {book.publisher} {dayjs(book.publishedAt).format("YYYY-MM-DD")}
            </p>
          </div>
        </div>
        <p className="line-clamp-4">{book.contents}</p>
      </div>
      {/* 데스크탑 */}
      <div className="hidden sm:flex">
        <div className="mr-4 h-[180px] w-[120px]">
          <img
            src={book.thumbnailUrl}
            alt={"thumbnail"}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3>{book.title}</h3>
          <p>{book.author.name}</p>
          <p>
            {book.publisher} {dayjs(book.publishedAt).format("YYYY-MM-DD")}
          </p>
          <p className="line-clamp-4">{book.contents}</p>
        </div>
      </div>
    </div>
  );
}
