import searchBooks from "@/app/actions/searchBooks";
import PostForm from "../_components/PostForm";

type Props = {
  searchParams: {
    isbn?: string;
  };
};

export default async function NewPostPage({ searchParams }: Props) {
  const isbn = searchParams.isbn;

  const response = await searchBooks(isbn);
  const initBook = response?.documents && response?.documents?.length > 0 ? response.documents[0] : undefined;

  return (
    <div className="w-[800px] px-4 flex flex-col gap-5">
      <PostForm initBook={initBook} />
    </div>
  );
}
