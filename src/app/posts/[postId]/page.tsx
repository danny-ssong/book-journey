import PostViewer from "@/app/_components/PostViewer";
const post = {
  book_id: 2,
  content: "This is content2",
  created_at: new Date().toISOString(),
  endDate: new Date().toISOString(),
  startDate: new Date().toISOString(),
  id: 2,
  isbn: "1234",
  rating: 3,
  title: "this is title2",
  user_id: "user_id",
};
const book = {
  id: "booki1",
};
export default function Page() {
  return (
    <main className="w-[800px] px-4 flex flex-col gap-5">
      <PostViewer book={book} post={post} />
    </main>
  );
}
