import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview({ post }: { post: PostWithUserProfileAndBook }) {
  return (
    <article className="last:border-none border-b-2 h-[200px] px-4 py-4 flex gap-4">
      <div className="flex justify-center items-center border">
        <Image
          src={post.book.thumbnail || ""}
          alt={post.book.title}
          width={120}
          height={160}
          className="w-[120px] h-[160px]"
        />
      </div>
      <div className="flex flex-col w-full mb-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center w-[400px]">
            <h2 className="hover:underline font-semibold line-clamp-1">
              <Link href={`/books/${post.book.isbn}`}>{post.book.title}</Link>
            </h2>
            <p className="hover:underline text-xs text-nowrap">
              <Link href={`/search?query=${post.book.author}`}>{post.book.author}</Link>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xs">최근 수정일</p>
            <time dateTime={post.updated_at || ""}>{dayjs(post.updated_at).format("YYYY-MM-DD")}</time>
          </div>
        </div>
        <RatingViewer rating={post.rating!} />
        <p className="text-sm hover:underline mb-2">
          <Link href={`/users/${post.user_id}`}>{post.profile.username}</Link>
        </p>
        <h1 className="hover:underline ">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h1>
        <Link href={`/posts/${post.id}`}>
          <p className="hover:underline w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">
            {post.content}
          </p>
        </Link>
      </div>
    </article>
  );
}
