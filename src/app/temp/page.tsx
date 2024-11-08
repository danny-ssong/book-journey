"use client";
import { getBooks } from "../_lib/forGenerateStaticParams/getBooks";
import searchBooks from "../actions/searchBooks";
import updateBook from "./_lib/updateBook";

export default function Test() {
  const addThumbnail = async () => {
    const books = await getBooks();
    if (books) {
      for (const book of books) {
        if (!book.thumbnail) {
          const data = await searchBooks(book.isbn, 1);
          const documents = data?.documents;

          if (documents && documents[0]) {
            const thumbnail = documents[0].thumbnail;
            updateBook(book.isbn, "thumbnail", thumbnail);
          }
        }
      }
    }
  };

  return (
    <div>
      <button onClick={addThumbnail}> update book thumbnail</button>
    </div>
  );
}
