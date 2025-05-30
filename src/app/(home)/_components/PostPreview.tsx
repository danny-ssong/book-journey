import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithBook } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview({ post }: { post: PostWithBook }) {
  return (
    <article>
      <Card>
        <CardContent className="flex flex-col p-4 sm:flex-row">
          <div className="flex gap-4 sm:block">
            <div className="h-[120px] w-[80px] overflow-hidden rounded-md border sm:h-[174px] sm:w-[120px]">
              <Image
                src={post.book.thumbnailUrl || ""}
                alt={post.book.title}
                width={120}
                height={174}
                className="bject-cover"
              />
            </div>
            <div className="flex flex-col sm:hidden">
              <div className="flex items-center gap-2">
                <h2 className="line-clamp-1 text-base hover:underline">
                  <Link href={`/books/${post.book.isbn}`}>
                    {post.book.title}
                  </Link>
                </h2>
                <p className="text-nowrap text-xs text-muted-foreground hover:underline">
                  <Link href={`/search?query=${post.book.author.name}`}>
                    {post.book.author.name}
                  </Link>
                </p>
              </div>
              <div className="flex items-center text-muted-foreground">
                <p className="mr-2 text-xs text-muted-foreground">
                  최근 수정일
                </p>
                <time dateTime={post.updatedAt.toString()}>
                  {dayjs(post.updatedAt).format("YYYY-MM-DD")}
                </time>
              </div>
              <p className="mt-auto text-ellipsis text-nowrap text-sm text-muted-foreground hover:underline">
                <Link href={`/users/${post.user.id}`}>
                  {post.user.profile.nickname}
                </Link>
              </p>
              <RatingViewer rating={post.rating!} />
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col sm:ml-6 sm:mt-0">
            <div className="hidden sm:flex sm:flex-col sm:justify-between">
              <div className="flex flex-col sm:w-[400px] sm:flex-row sm:items-center">
                <h2 className="mr-2 line-clamp-1 text-base hover:underline sm:text-lg">
                  <Link href={`/books/${post.book.isbn}`}>
                    {post.book.title}
                  </Link>
                </h2>
                <p className="text-xs text-muted-foreground hover:underline sm:text-sm">
                  <Link href={`/search?query=${post.book.author.name}`}>
                    {post.book.author.name}
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex items-center text-muted-foreground sm:mt-0">
                <p className="mr-2 text-xs text-muted-foreground">
                  최근 수정일
                </p>
                <time dateTime={post.updatedAt.toString()}>
                  {dayjs(post.updatedAt).format("YYYY-MM-DD")}
                </time>
              </div>
            </div>
            <h1 className="mt-1 line-clamp-1 text-base font-semibold hover:underline sm:text-lg">
              <Link href={`/posts/${post.id}`}>{post.title || "\u00A0"}</Link>
            </h1>
            <div className="mt-3 hidden items-center gap-2 sm:flex">
              <p className="text-sm text-muted-foreground hover:underline">
                <Link href={`/users/${post.user.id}`}>
                  {post.user.profile.nickname}
                </Link>
              </p>
              <RatingViewer rating={post.rating!} />
            </div>
            <Link href={`/posts/${post.id}`} className="mb-4 mt-auto">
              <p className="line-clamp-3 w-full flex-1 overflow-hidden text-ellipsis text-sm hover:underline sm:min-h-[3.75rem]">
                {post.content}
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
