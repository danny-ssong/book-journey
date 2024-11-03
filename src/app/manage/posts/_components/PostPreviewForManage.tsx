import React from "react";
import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import PostPreviewButtons from "./PostPreviewButtons";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";

async function PostPreviewForManage({ post }: { post: PostWithBook }) {
  const user = await getUserOnServer();
  return (
    <div className="last:border-none flex-col border-b h-[160px] px-6 py-4 group">
      <div className="flex justify-between w-full">
        <p className="text-md font-semibold">{post.books.title}</p>
        <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <RatingViewer rating={post.rating!} />
          <p>{post.title}</p>
        </div>
        {user?.id === post.user_id && <PostPreviewButtons postId={post.id} />}
      </div>
      <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
    </div>
  );
}

export default PostPreviewForManage;
