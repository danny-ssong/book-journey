import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  authorName: string;
  className?: string;
  asLink?: boolean;
};

export default function AuthorName({
  authorName,
  className,
  asLink = false,
}: Props) {
  return (
    <p
      className={cn(
        "line-clamp-1 whitespace-nowrap text-sm text-muted-foreground",
        className,
      )}
      aria-label={"저자"}
    >
      {asLink ? (
        <Link href={`/search?query=${authorName}`} className="hover:underline">
          {authorName}
        </Link>
      ) : (
        authorName
      )}
    </p>
  );
}
