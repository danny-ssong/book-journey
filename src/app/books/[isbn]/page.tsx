import RatingViewer from "@/app/_components/RatingViewer";
import searchBooks from "@/app/actions/searchBooks";
import getUserPosts from "@/app/manage/[user_id]/posts/_lib/getPosts";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";
import getPostsWithUserProfileByIsbn from "./_lib/getPostsWithUserProfileByIsbn";
import BookPostPreview from "./_components/BookPostPreview";

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
  const postWithProfiles = await getPostsWithUserProfileByIsbn(isbn);

  return (
    <div className="w-[1000px]">
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
      <div className="mt-20 border-t-2 mx-24">
        <ul>
          {postWithProfiles?.map((postWithProfile) => (
            <li key={postWithProfile.id}>
              <BookPostPreview postWithProfile={postWithProfile} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
