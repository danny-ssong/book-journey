import RatingViewer from "@/app/_components/RatingViewer";
import searchBooks from "@/app/actions/searchBooks";
import dayjs from "dayjs";
import Image from "next/image";

type Props = {
  params: {
    isbn: string;
  };
};
//isbn
//ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호(International Standard Book Number)
// ISBN10 또는 ISBN13 중 하나 이상 포함
// 두 값이 모두 제공될 경우 공백(' ')으로 구분

export default async function Page({ params }: Props) {
  let { isbn } = params;
  if (isbn.includes("%")) {
    isbn = isbn.split("%")[0];
  }

  const response = await searchBooks(isbn, 5, 1);
  const book = response.documents[0];

  return (
    <div className="w-[1000px]">
      {book && (
        <>
          <div className="flex mx-24">
            <div className="w-[120px] h-[180px] mr-4">
              <Image src={book.thumbnail} alt={"m"} width={120} height={174} />
            </div>
            <div className="flex-1">
              <h3>{book.title}</h3>
              <p>{book.authors[0]}</p>
              <p>
                {book.publisher} {dayjs(book.datetime).format("YYYY-MM-DD")}{" "}
              </p>
              <p>{book.contents}</p>
            </div>
          </div>
          <div className="mt-20 border-t-2">
            <ul>
              <li>
                <div>
                  <div>
                    <p>id</p>
                  </div>
                  <div>
                    <h3>title</h3>
                    <RatingViewer rating={5} />
                    <p>content</p>
                  </div>
                </div>
              </li>
              <li>리뷰2</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
