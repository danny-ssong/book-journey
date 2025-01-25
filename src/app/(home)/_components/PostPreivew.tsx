import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview({
  post,
}: {
  post: PostWithUserProfileAndBook;
}) {
  return (
    <article className="flex h-[200px] gap-4 border-b-2 px-4 py-4 last:border-none">
      <div className="flex items-center justify-center border">
        <Image
          src={post.book.thumbnail || ""}
          alt={post.book.title}
          width={120}
          height={160}
          className="h-[160px] w-[120px]"
        />
      </div>
      <div className="mb-2 flex w-full flex-col">
        <div className="flex justify-between">
          <div className="flex w-[400px] items-center gap-2">
            <h2 className="line-clamp-1 font-semibold hover:underline">
              <Link href={`/books/${post.book.isbn}`}>{post.book.title}</Link>
            </h2>
            <p className="text-nowrap text-xs hover:underline">
              <Link href={`/search?query=${post.book.author}`}>
                {post.book.author}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">최근 수정일</p>
            <time dateTime={post.updated_at || ""}>
              {dayjs(post.updated_at).format("YYYY-MM-DD")}
            </time>
          </div>
        </div>
        <RatingViewer rating={post.rating!} />
        <p className="mb-2 text-sm hover:underline">
          <Link href={`/users/${post.user_id}`}>{post.profile.username}</Link>
        </p>
        <h1 className="hover:underline">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h1>
        <Link href={`/posts/${post.id}`}>
          <p className="line-clamp-3 w-full flex-1 overflow-hidden text-ellipsis text-sm hover:underline">
            {post.content}
          </p>
        </Link>
      </div>
    </article>
  );
}
