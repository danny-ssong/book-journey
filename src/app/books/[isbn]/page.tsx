import { notFound } from "next/navigation";
import PostPreviewForBook from "../_components/PostPreviewForBook";
import Link from "next/link";
import BookDetail from "../_components/BookDetail";
import { Button } from "@/components/ui/button";
import { getBookWithPosts, searchBooks } from "../_lib/book";

type Props = {
  params: {
    isbn: string;
  };
};

export default async function Page({ params }: Props) {
  let { isbn } = params;

  const response = await searchBooks(isbn, 5, 1);
  if (response.documents.length === 0) notFound();

  const book = response.documents[0];
  const bookWithPosts = await getBookWithPosts(isbn);
  const posts = bookWithPosts?.posts;

  return (
    <div className="w-[800px] border bg-background">
      <BookDetail book={book} />
      <div className="mx-2 my-2 flex items-center justify-end">
        <Button>
          <Link href={`/posts/new?isbn=${isbn}`}>글 쓰기</Link>
        </Button>
      </div>
      <div className="border-t-2">
        <ul>
          {posts?.map((post) => (
            <PostPreviewForBook key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   const books = await getBooks();
//   if (!books) return [];
//   return books?.map((book) => ({
//     isbn: book.isbn,
//   }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const book = await getBook(params.isbn);
//   if (!book) return { title: "Book Not Found" };
//   return { title: `${book.title} 책 정보` };
// }
