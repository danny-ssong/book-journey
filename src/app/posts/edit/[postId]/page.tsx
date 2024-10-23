import { createClient } from "@/utils/supabase/server";
import PostForm from "../../_components/PostForm";
import { notFound } from "next/navigation";
import getPostWithBook from "../../[postId]/_lib/getPostWithBook";
import searchBooks from "@/app/actions/searchBooks";

export default async function Page({ params }: { params: { postId: string } }) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const postId = params?.postId;
  if (!postId) notFound();

  const postWithBook = await getPostWithBook(postId);
  if (!postWithBook) notFound();

  if (postWithBook.user_id !== userData.user?.id) notFound();

  const isbnForSearch = postWithBook.isbn.includes(" ") ? postWithBook.isbn.split(" ")[0] : postWithBook.isbn;

  const response = await searchBooks(isbnForSearch, 5, 1);
  const book = response.documents[0];

  console.log(book);
  return (
    <div className="w-[800px] px-4 flex flex-col gap-5">
      <PostForm initBook={book} initPost={postWithBook} />
    </div>
  );
}
