import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfileAndBook } from "@/app/_types/supabaseTypes";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview({ post }: { post: PostWithUserProfileAndBook }) {
  return (
    <div className="last:border-none border-b-2 h-[200px] px-4 py-4 flex gap-4">
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
          <div className="flex gap-2 items-center">
            <Link href={`/books/${post.book.isbn}`}>
              <p className="hover:underline font-semibold">{post.book.title}</p>
            </Link>
            <Link href={`/search?query=${post.book.author}`}>
              <p className="hover:underline text-xs ">{post.book.author}</p>
            </Link>
          </div>
          <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
        </div>
        <RatingViewer rating={post.rating!} />
        <div className="flex justify-start">
          <Link href={`/users/${post.user_id}`}>
            <p className="text-sm hover:underline">{post.profile.username}</p>
          </Link>
        </div>
        <div className="flex">
          <Link href={`/posts/${post.id}`}>
            <p className="hover:underline ">{post.title}</p>
          </Link>
        </div>
        <div className="flex">
          <Link href={`/posts/${post.id}`}>
            <p className="hover:underline w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">
              {post.content}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
