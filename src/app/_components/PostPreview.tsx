import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import dayjs from "dayjs";

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
        <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                className={`${starValue > post?.rating! ? "text-gray-300" : "text-yellow-400"} text-base`}
                key={index}
              >
                &#9733;
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
