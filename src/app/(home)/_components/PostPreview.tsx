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
          <div className="relative mr-6 aspect-[3/4] w-[180px] overflow-hidden rounded-md border">
            <Image
              src={post.book.thumbnail || ""}
              alt={post.book.title}
              fill
              className="object-cover"
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
                <p className="text-muted-foreground text-nowrap text-xs hover:underline">
                  <Link href={`/search?query=${post.book.author}`}>
                    {post.book.author}
                  </Link>
                </p>
              </div>
              <div className="text-muted-foreground flex items-center">
                <p className="text-muted-foreground mr-2 text-xs">
                  최근 수정일
                </p>
                <time dateTime={post.updated_at || ""}>
                  {dayjs(post.updated_at).format("YYYY-MM-DD")}
                </time>
              </div>
            </div>
            <h1 className="mt-1 min-h-[1em] text-lg font-semibold hover:underline">
              <Link href={`/posts/${post.id}`}>{post.title || " "}</Link>
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-muted-foreground text-sm hover:underline">
                <Link href={`/users/${post.user_id}`}>
                  {post.profile.username}
                </Link>
              </p>
              <RatingViewer rating={post.rating!} />
            </div>
            <Link href={`/posts/${post.id}`} className="mb-4 mt-auto">
              <p className="line-clamp-3 w-full flex-1 overflow-hidden text-ellipsis text-sm hover:underline">
                {post.content}
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
