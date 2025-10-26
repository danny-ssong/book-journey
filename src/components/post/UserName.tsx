import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  userName: string;
  userId: string;
  className?: string;
  asLink?: boolean;
};

export default function UserName({
  userName,
  userId,
  className,
  asLink = false,
}: Props) {
  return (
    <p className={cn("text-sm", className)} aria-label={"작성자"}>
      {asLink ? (
        <Link href={`/users/${userId}`} className="hover:underline">
          {userName}
        </Link>
      ) : (
        userName
      )}
    </p>
  );
}
