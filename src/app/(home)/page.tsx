import { Metadata } from "next";
import AllPostList from "./_components/AllPostList";

export default async function HOME() {
  return (
    <div className="h-full">
      <h2 className="mb-5 px-4 text-xl">최신 글</h2>
      <AllPostList />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` };
}

// export const revalidate = 60;
