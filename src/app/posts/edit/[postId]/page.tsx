import PostForm from "../../_components/PostForm";
import { notFound } from "next/navigation";
import getPost from "../../[postId]/_lib/getPostWithBook";
import searchBooks from "@/app/actions/searchBooks";
import getUserOnServer from "@/app/_lib/getUserOnServer";

export default async function Page({ params }: { params: { postId: string } }) {
  const user = await getUserOnServer();
  const postId = params?.postId;
  if (!postId) notFound();

  const postWithBook = await getPost(postId);
  if (!postWithBook) notFound();

  if (postWithBook.user_id !== user?.id) notFound();

  const response = await searchBooks(postWithBook.isbn, 5, 1);
  const book = response?.documents[0];

  return <PostForm initBook={book} initPost={postWithBook} />;
}
