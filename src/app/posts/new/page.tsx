import searchBooks from "@/app/actions/searchBooks";
import PostForm from "../_components/PostForm";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    isbn?: string;
  };
};

export default async function NewPostPage({ searchParams }: Props) {
  const user = await getUserOnServer();
  if (!user) redirect("/login");

  const isbn = searchParams.isbn;

  const response = await searchBooks(isbn);
  const initBook =
    response?.documents && response?.documents?.length > 0
      ? response.documents[0]
      : undefined;

  return <PostForm initBook={initBook} />;
}
