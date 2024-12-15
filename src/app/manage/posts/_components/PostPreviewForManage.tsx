import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import PostActionButtons from "./PostPreviewButtons";
import { PostWithBook } from "@/app/_models/supabaseTypes";
import Image from "next/image";

function ExapndedPostPreviewForManage({ post, isOwner }: { post: PostWithBook; isOwner: boolean }) {
  return (
    <article className="last:border-none border-b-2 h-[200px] px-4 py-4 flex gap-4 group">
      <figure className="flex justify-center items-center border">
        <Image
          src={post.book.thumbnail || ""}
          alt={post.book.title}
          width={120}
          height={160}
          className="w-[120px] h-[160px]"
        />
      </figure>
      <div className="flex flex-col w-full mb-2">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <h2 className="text-md font-semibold">{post.book.title}</h2>
            <p className="text-xs">{post.book.author}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xs">작성일</p>
            <time dateTime={post.created_at || ""}>{dayjs(post.created_at).format("YYYY-MM-DD")}</time>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div>
            <RatingViewer rating={post.rating!} />
            <h1>{post.title}</h1>
          </div>
          {isOwner && <PostActionButtons postId={post.id} />}
        </div>
        <p className="w-full overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
      </div>
    </article>
  );
}

export default ExapndedPostPreviewForManage;
