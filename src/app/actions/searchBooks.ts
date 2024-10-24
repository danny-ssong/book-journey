"use server";

export default async function searchBooks(query: string | null, size: number = 10, page: number = 1) {
  if (!query) return;
  //   const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=10`;
  const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=${size}&page=${page}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const isbnProcessedDocuemnts = data.documents.map((book: any) => {
      const { isbn } = book;
      const [isbn10, isbn13] = isbn.split(" ");
      return {
        ...book,
        isbn: isbn.includes(" ") ? isbn13 : isbn,
      };
    });

    return {
      ...data,
      documents: isbnProcessedDocuemnts,
    };
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
