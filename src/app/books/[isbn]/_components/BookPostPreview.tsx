import RatingViewer from "@/app/_components/RatingViewer";
import { Post } from "@/app/_types/supabaseTypes";
import dayjs from "dayjs";

type Props = {
  post: Post;
};

export default function BookPostPreview({ post }: Props) {
  return (
    <div className="first:border-t-2 flex-col border-b-2 h-[150px] w-[650px] px-2 py-2 group">
      <div className="flex justify-between w-full">
        <RatingViewer rating={post.rating!} />
        <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex justify-between items-center">
        <p>{post.title}</p>
        {/* <p>{post.user_id}</p> */}
      </div>
      <p className="w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">{post.content}</p>
    </div>
  );
}
