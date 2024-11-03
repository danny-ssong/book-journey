import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfile } from "@/app/_types/supabaseTypes";
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
          <Link href={`/users/${postWithProfile.user_id}`}>
            <p className="hover:underline text-sm">{postWithProfile.profile.username}</p>
          </Link>
        </div>
        <div>{dayjs(postWithProfile.created_at).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <Link href={`/posts/${postWithProfile.id}`}>
          <p className="hover:underline text-lg">{postWithProfile.title}</p>
        </Link>
      </div>
      <Link href={`/posts/${postWithProfile.id}`}>
        <p className="hover:underline w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">
          {postWithProfile.content}
        </p>
      </Link>
    </div>
  );
}
