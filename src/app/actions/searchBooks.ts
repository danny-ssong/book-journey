// "use server";

// export default async function searchBooks(
//   query: string | undefined | null,
//   size: number = 10,
//   page: number = 1
// ): Promise<{ documents: SearchedBook[]; meta: any } | null> {
//   if (!query) return null;
//   //   const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=10`;
//   const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(
//     query
//   )}&size=${size}&page=${page}`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     const uniqueBooks = removeDuplicatedBooks(data.documents);
//     const booksUsingIsbn13 = removeIsbn10(uniqueBooks);

//     return {
//       ...data,
//       documents: booksUsingIsbn13,
//     };
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//     return null;
//   }
// }

// function removeDuplicatedBooks(books: SearchedBook[]) {
//   const uniqueBookIdentifiers = new Set();

//   const uniqueBooks = books.filter((book: SearchedBook) => {
//     const identifiler = `${book.title}-${book.authors[0]}-${book.translators[0]}`;
//     if (uniqueBookIdentifiers.has(identifiler)) {
//       return false;
//     }
//     uniqueBookIdentifiers.add(identifiler);
//     return true;
//   });

//   return uniqueBooks;
// }

// function removeIsbn10(books: SearchedBook[]) {
//   //isbn
//   //ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호(International Standard Book Number)
//   // ISBN10 또는 ISBN13 중 하나 이상 포함
//   // 두 값이 모두 제공될 경우 공백(' ')으로 구분
//   const isbnProcessedBooks = books.map((book: SearchedBook) => {
//     const { isbn } = book;
//     const [isbn10, isbn13] = isbn.split(" ");
//     return {
//       ...book,
//       isbn: isbn.includes(" ") ? isbn13 : isbn,
//     };
//   });
//   return isbnProcessedBooks;
// }
