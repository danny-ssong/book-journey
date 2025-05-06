import { PostWithBook } from "@/types/post";
import PostPreview from "../(home)/_components/PostPreview";

export default function PostList({ posts }: { posts: PostWithBook[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </ul>
  );
}
