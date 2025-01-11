import { Metadata } from "next";
import getPosts from "../actions/getPosts";
import PostPreview from "./_components/PostPreivew";
import PaginationButtons from "../manage/posts/_components/PaginationButtons";

type Props = {
  searchParams: {
    page: number;
  };
};

export default async function HOME({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const size = 5;

  const { posts, isLastPage } = await getPosts(size, page);

  return (
    <div className="h-full">
      <h2 className="mb-5 px-4 text-xl">최신 글</h2>
      <ul className="border bg-white">
        {posts.map((post, index) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </ul>
      <PaginationButtons
        baseURL="/"
        currentPage={page}
        isLastPage={isLastPage}
      />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` };
}

export const revalidate = 60;
