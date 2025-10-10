import Image from "next/image";

import dayjs from "dayjs";

import { Book } from "@/types/book";

export default function BookDetail({ book }: { book: Book }) {
  return (
    <div className="flex px-4 py-4">
      <div className="flex">
        <div className="mr-4 h-[180px] w-[120px]">
          <Image
            src={book.thumbnailUrl}
            alt={"thumbnail"}
            className="object-cover"
            width={120}
            height={180}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p>{book.author.name}</p>
          <p className="text-muted-foreground">
            {book.publisher} {dayjs(book.publishedAt).format("YYYY-MM-DD")}
          </p>
          <p className="line-clamp-4">{book.contents}</p>
        </div>
      </div>
    </div>
  );
}
