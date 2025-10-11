import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

type Props = {
  post: Post;
  className?: string;
  asLink?: boolean;
  maxLines?: 1 | 2 | 3 | 4 | 5;
};

export default function PostContent({
  post,
  className,
  asLink = false,
  maxLines,
}: Props) {
  const classMap = {
    1: cn("text-sm line-clamp-1 h-[1.25rem] ", className),
    2: cn("text-sm line-clamp-2 h-[2.5rem] ", className),
    3: cn("text-sm line-clamp-3 h-[3.75rem] ", className),
    4: cn("text-sm line-clamp-4 h-[5rem] ", className),
    5: cn("text-sm line-clamp-5 h-[6.25rem] ", className),
  } as const;

  return (
    <p className={maxLines ? classMap[maxLines] : className}>
      {asLink ? (
        <Link href={`/posts/${post.id}`} className="hover:underline">
          {post.content}
        </Link>
      ) : (
        post.content
      )}
    </p>
  );
}
