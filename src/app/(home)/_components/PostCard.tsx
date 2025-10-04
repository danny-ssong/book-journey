import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithBook } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import MyPostActionButtons from "@/app/manage/posts/_components/MyPostActionButtons";

type Props = {
  post: PostWithBook;
  isOwner: boolean;
};

export default function PostCard({ post, isOwner = false }: Props) {
  const updatedAtId = `post-${post.id}-updated-at`;

  return (
    <Card className="h-[210px]">
      <article className="flex h-full p-4">
        <figure className="mr-6 h-[174px] w-[120px] overflow-hidden rounded-md border">
          <Image
            src={post.book.thumbnailUrl || ""}
            alt={post.book.title}
            width={120}
            height={174}
            className="h-full w-full object-cover"
          />
        </figure>
        <section className="flex flex-1 flex-col">
          <header>
            <div className="flex items-center gap-2">
              <p className="mr-2 line-clamp-1 text-lg hover:underline">
                <Link href={`/books/${post.book.isbn}`}>{post.book.title}</Link>
              </p>
              <p className="text-nowrap text-sm text-muted-foreground hover:underline">
                <Link href={`/search?query=${post.book.author.name}`}>
                  {post.book.author.name}
                </Link>
              </p>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span
                className="mr-2 text-xs text-muted-foreground"
                id={updatedAtId}
              >
                최근 수정일
              </span>
              <time
                dateTime={post.updatedAt.toString()}
                aria-labelledby={updatedAtId}
              >
                {dayjs(post.updatedAt).format("YYYY-MM-DD")}
              </time>
            </div>
            <h1 className="mt-1 line-clamp-1 text-lg font-semibold hover:underline">
              <Link href={`/posts/${post.id}`}>{post.title || "\u00A0"}</Link>
            </h1>
          </header>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              {!isOwner && (
                <p className="mr-2 text-sm text-muted-foreground hover:underline">
                  <Link href={`/users/${post.user.id}`}>
                    {post.user.profile.nickname}
                  </Link>
                </p>
              )}
              <RatingViewer rating={post.rating!} />
            </div>
            {isOwner && <MyPostActionButtons postId={post.id} />}
          </div>

          <div className="flex-1">
            <p className="line-clamp-3 text-sm hover:underline">
              <Link href={`/posts/${post.id}`}>{post.content}</Link>
            </p>
          </div>
        </section>
      </article>
    </Card>
  );
}
