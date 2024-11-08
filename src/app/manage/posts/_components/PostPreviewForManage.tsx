import React from "react";
import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import PostPreviewButtons from "./PostPreviewButtons";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Image from "next/image";

async function PostPreviewForManage({ post }: { post: PostWithBook }) {
  const user = await getUserOnServer();
  return (
    <div className="last:border-none border-b-2 h-[200px] px-4 py-4 flex gap-4 group">
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
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <p className="text-md font-semibold">{post.book.title}</p>
            <p className="text-xs ">{post.book.author}</p>
          </div>
          <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div>
            <RatingViewer rating={post.rating!} />
            <p>{post.title}</p>
          </div>
          {user?.id === post.user_id && <PostPreviewButtons postId={post.id} />}
        </div>
        <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
      </div>
    </div>
  );
}

export default PostPreviewForManage;
