import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

type Props = {
  post: Post;
  className?: string;
  asLink?: boolean;
};

export default function PostTitle({ post, className, asLink = false }: Props) {
  return (
    <h1 className={cn("line-clamp-1 text-lg", className)}>
      {asLink ? (
        <Link href={`/posts/${post.id}`} className="hover:underline">
          {post.title || "\u00A0"}
        </Link>
      ) : (
        post.title || "\u00A0"
      )}
    </h1>
  );
}
