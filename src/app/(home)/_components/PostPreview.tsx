import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview({
  post,
}: {
  post: PostWithUserProfileAndBook;
}) {
  return (
    <article>
      <Card>
        <CardContent className="flex p-4">
          <div className="mr-6 overflow-hidden rounded-md border">
            <Image
              src={post.book.thumbnail || ""}
              alt={post.book.title}
              width={120}
              height={174}
              className="h-full"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <div className="flex w-[400px] items-center">
                <h2 className="mr-2 line-clamp-1 hover:underline">
                  <Link href={`/books/${post.book.isbn}`}>
                    {post.book.title}
                  </Link>
                </h2>
                <p className="text-nowrap text-xs text-muted-foreground hover:underline">
                  <Link href={`/search?query=${post.book.author}`}>
                    {post.book.author}
                  </Link>
                </p>
              </div>
              <div className="flex items-center text-muted-foreground">
                <p className="mr-2 text-xs text-muted-foreground">
                  최근 수정일
                </p>
                <time dateTime={post.updated_at || ""}>
                  {dayjs(post.updated_at).format("YYYY-MM-DD")}
                </time>
              </div>
            </div>
            <h1 className="mt-1 line-clamp-1 text-lg font-semibold hover:underline">
              <Link href={`/posts/${post.id}`}>{post.title || "\u00A0"}</Link>
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-sm text-muted-foreground hover:underline">
                <Link href={`/users/${post.user_id}`}>
                  {post.profile.username}
                </Link>
              </p>
              <RatingViewer rating={post.rating!} />
            </div>
            <Link href={`/posts/${post.id}`} className="mb-4 mt-auto">
              <p className="line-clamp-3 min-h-[3.75rem] w-full flex-1 overflow-hidden text-ellipsis text-sm hover:underline">
                {post.content}
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
