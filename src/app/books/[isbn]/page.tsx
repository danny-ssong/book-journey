import searchBooks from "@/app/actions/searchBooks";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";
import getPostsWithUserProfileByIsbn from "./_lib/getPostsWithUserProfileByIsbn";
import BookPostPreview from "./_components/BookPostPreview";
import Link from "next/link";
import BookDetail from "./_components/BookDetail";

type Props = {
  params: {
    isbn: string;
  };
};

export default async function Page({ params }: Props) {
  let { isbn } = params;

  const response = await searchBooks(isbn, 5, 1);
  if (response?.documents.length === 0) notFound();
  const book = response?.documents[0];
  if (!book) notFound();
  const postWithProfiles = await getPostsWithUserProfileByIsbn(isbn);

  return (
    <div className="w-[800px] bg-white">
      <BookDetail book={book} />
      <div className="flex justify-end items-center my-2">
        <div className="px-4 py-2 rounded-xl border hover:bg-slate-100">
          <Link href={`/posts/new?isbn=${isbn}`}>글 쓰기</Link>
        </div>
      </div>
      <div className="border-t-2">
        <ul>
          {postWithProfiles &&
            [...postWithProfiles.reverse()].map((postWithProfile) => (
              <li key={postWithProfile.id}>
                <BookPostPreview postWithProfile={postWithProfile} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
