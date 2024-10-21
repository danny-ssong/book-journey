import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import dayjs from "dayjs";
import RatingViewer from "./RatingViewer";

type Post = Tables<"posts">;

function PostPreview({ post }: { post: Post }) {
  return (
    <div className="first:border-t-2 flex border-b-2 h-[130px]">
      <div className="w-[100px] bg-slate-200">{post.isbn}</div>
      <div className="flex flex-col gap-1 px-2 py-1 w-[500px] ">
        <div className="flex justify-between w-full">
          <div className="text-lg font-medium">{post.title}</div>
          <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
        </div>
        <div className="flex items-center">
          <RatingViewer rating={5} />
        </div>
        <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
      </div>
    </div>
  );
}

export default PostPreview;
