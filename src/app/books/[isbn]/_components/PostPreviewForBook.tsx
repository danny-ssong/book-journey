import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfile } from "@/app/_models/supabaseTypes";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  postWithProfile: PostWithUserProfile;
};

export default function PostPreviewForBook({ postWithProfile }: Props) {
  return (
    <div className="last:border-none flex-col border-b-2 h-[180px] px-2 py-2">
      <div className="flex justify-between w-full mb-2">
        <div>
          <RatingViewer rating={postWithProfile.rating!} />
          <p className="hover:underline text-sm">
            <Link href={`/users/${postWithProfile.user_id}`}>{postWithProfile.profile.username}</Link>
          </p>
        </div>
        <time dateTime={postWithProfile.created_at || ""}>
          {dayjs(postWithProfile.created_at).format("YYYY-MM-DD")}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="hover:underline text-lg">
          <Link href={`/posts/${postWithProfile.id}`}>{postWithProfile.title}</Link>
        </p>
      </div>
      <p className="hover:underline w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">
        <Link href={`/posts/${postWithProfile.id}`}>{postWithProfile.content}</Link>
      </p>
    </div>
  );
}
