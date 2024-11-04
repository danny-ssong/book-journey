import { Metadata } from "next";
import getPosts from "../_lib/getPosts";
import PostPreview from "./_components/PostPreivew";

export default async function HOME() {
  const size = 10;
  const page = 1;

  const { posts, isLastPage } = await getPosts(size, page);

  return (
    <div className="mt-5 w-[800px]">
      <h2 className="mb-5 text-xl px-4">최신 글</h2>
      <ul className="min-h-[500px] bg-white border">
        {posts.map((post, index) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` };
}

export const revalidate = 60;
