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
  maxLines = 3,
}: Props) {
  const getClasses = (lines: 1 | 2 | 3 | 4 | 5) => {
    switch (lines) {
      case 1:
        return cn("text-sm line-clamp-1 h-[1.25rem] ", className);
      case 2:
        return cn("text-sm line-clamp-2 h-[2.5rem] ", className);
      case 3:
        return cn("text-sm line-clamp-3 h-[3.75rem] ", className);
      case 4:
        return cn("text-sm line-clamp-4 h-[5rem] ", className);
      case 5:
        return cn("text-sm line-clamp-5 h-[6.25rem] ", className);
      default:
        return cn("text-sm line-clamp-3 h-[3.75rem] ", className);
    }
  };

  return (
    <p className={getClasses(maxLines)}>
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
