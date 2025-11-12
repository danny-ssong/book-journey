import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getBook } from "@/api/book";
import { getBookWithPostsOnServer, getBooks } from "@/api/server/book";

import BookInfo from "../_components/BookInfo";
import PostCardForBook from "../_components/PostCardForBook";

type Props = {
  params: {
    isbn: string;
  };
};

export default async function Page({ params }: Props) {
  let { isbn } = params;

  const bookWithPosts = await getBookWithPostsOnServer(isbn);
  const posts = bookWithPosts?.posts;

  return (
    <div>
      <section className="mb-2 border" aria-label="책 정보">
        <BookInfo book={bookWithPosts} />
        <div className="p-2 text-right">
          <Button>
            <Link href={`/posts/new?isbn=${isbn}`}>글 쓰기</Link>
          </Button>
        </div>
      </section>
      <ul aria-label="책 포스트 목록">
        {posts?.map((post) => <PostCardForBook key={post.id} post={post} />)}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  const books = await getBooks();

  return books.map((book) => ({
    isbn: book.isbn,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.isbn);
  if (!book) return { title: "Book Not Found" };
  return { title: `${book.title} 책 정보` };
}

export const revalidate = 3600;
