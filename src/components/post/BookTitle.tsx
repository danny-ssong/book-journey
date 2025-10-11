import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  isbn: string;
  className?: string;
  asLink?: boolean;
};

export default function BookTitle({
  title,
  isbn,
  className,
  asLink = false,
}: Props) {
  return (
    <p className={cn("text-lg", className)}>
      {asLink ? (
        <Link href={`/books/${isbn}`} className="hover:underline">
          {title}
        </Link>
      ) : (
        title
      )}
    </p>
  );
}
