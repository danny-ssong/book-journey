import { PostWithBook } from "@/types/post";

import PostCard from "./PostCard";

export default function PostCardList({ posts }: { posts: PostWithBook[] }) {
  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
