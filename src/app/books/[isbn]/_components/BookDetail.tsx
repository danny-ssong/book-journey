import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function BookDetail({ book }: { book: SearchedBook }) {
  return (
    <div className="flex px-4 py-4">
      <div className="w-[120px] h-[180px] mr-4">
        <Image src={book.thumbnail} alt={"m"} width={120} height={174} />
      </div>
      <div className="flex-1">
        <h3>{book.title}</h3>
        <p>{book.authors[0]}</p>
        <p>
          {book.publisher} {dayjs(book.datetime).format("YYYY-MM-DD")}
        </p>
        <p>{book.contents}</p>
      </div>
    </div>
  );
}
