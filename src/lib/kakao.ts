import "server-only";

import type { SearchedBook } from "@/types/book";

type KakaoSearchedBook = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

type KakaoSearchResponseMeta = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};

type KakaoSearchRawResponse = {
  documents: KakaoSearchedBook[];
  meta: KakaoSearchResponseMeta;
};

export type SearchBooksResponse = {
  documents: SearchedBook[];
  meta: KakaoSearchResponseMeta;
};

function getKakaoEnv() {
  const baseUrl = process.env.KAKAO_BASE_URL;
  const apiKey = process.env.KAKAO_API_KEY;
  if (!baseUrl || !apiKey) {
    throw new Error("KAKAO_BASE_URL 또는 KAKAO_API_KEY가 설정되지 않았습니다");
  }
  return { baseUrl, apiKey };
}

/**
 * Kakao Book API에 도서 검색 요청.
 * 응답을 우리 도메인 형태(Book)로 변환하고 중복 제거 + ISBN13 우선 정책을 적용한다.
 */
export async function searchKakaoBooks(
  query: string,
  size = 10,
  page = 1,
): Promise<SearchBooksResponse> {
  const { baseUrl, apiKey } = getKakaoEnv();

  const url = `${baseUrl}/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=${size}&page=${page}`;
  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
  });
  if (!res.ok) {
    throw new Error(`Kakao Book API 호출 실패 (status=${res.status})`);
  }

  const data = (await res.json()) as KakaoSearchRawResponse;
  const unique = removeDuplicatedBooks(data.documents);
  const documents = unique.map(convertToBook);
  return { meta: data.meta, documents };
}

/**
 * ISBN으로 Kakao API 검색 후 첫 결과를 반환. NestJS findOne과 동일 동작.
 */
export async function findKakaoBookByIsbn(
  isbn: string,
): Promise<SearchedBook | null> {
  const result = await searchKakaoBooks(isbn, 1, 1);
  return result.documents[0] ?? null;
}

function removeDuplicatedBooks(books: KakaoSearchedBook[]): KakaoSearchedBook[] {
  const seen = new Set<string>();
  return books.filter((b) => {
    const key = `${b.title}-${b.authors?.[0] ?? ""}-${b.translators?.[0] ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function convertToBook(b: KakaoSearchedBook): SearchedBook {
  // Kakao는 ISBN10/ISBN13을 공백으로 구분해 반환할 수 있다. 가능하면 ISBN13을 사용.
  const [isbn10, isbn13] = b.isbn.split(" ");
  const isbn = b.isbn.includes(" ") ? isbn13 : isbn10;

  return {
    isbn,
    title: b.title,
    contents: b.contents,
    url: b.url,
    publisher: b.publisher,
    thumbnailUrl: b.thumbnail,
    publishedAt: new Date(b.datetime),
    author: { name: b.authors?.[0] ?? "" },
    price: b.price,
    sale_price: b.sale_price,
    status: b.status,
    translators: b.translators,
  };
}
