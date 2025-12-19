import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

type Props = {
  post: Post;
  className?: string;
  asLink?: boolean;
};

export default function PostTitle({ post, className, asLink = false }: Props) {
  const href = post.isPrivate
    ? `/manage/posts/${post.id}`
    : `/posts/${post.id}`;

  return (
    <h1
      className={cn("line-clamp-1 text-lg", className)}
      aria-label={"포스트 제목"}
    >
      {asLink ? (
        <Link href={href} className="hover:underline">
          {post.title}
        </Link>
      ) : (
        post.title
      )}
    </h1>
  );
}
