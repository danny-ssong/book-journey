import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import dayjs from "dayjs";
import RatingViewer from "../../../../_components/RatingViewer";
import PostPreviewButtons from "./PostPreviewButtons";

type PostWithBook = Tables<"posts"> & {
  books: {
    title: string;
    author: string;
  };
};

function PostPreview({ post }: { post: PostWithBook }) {
  return (
    <div className="first:border-t-2 flex-col border-b-2 h-[150px] w-[650px] px-2 py-2 group">
      <div className="flex justify-between w-full">
        <p className="text-md font-medium">{post.books.title}</p>
        <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <RatingViewer rating={post.rating!} />
          <p>{post.title}</p>
        </div>
        <PostPreviewButtons postId={post.id} />
      </div>
      <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
    </div>
  );
}

export default PostPreview;
