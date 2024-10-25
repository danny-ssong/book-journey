import PaginationButtons from "@/app/manage/[user_id]/posts/_components/PaginationButtons";
import PostPreview from "@/app/manage/[user_id]/posts/_components/PostPreview";
import getUserPosts from "@/app/manage/[user_id]/posts/_lib/getPosts";
import getProfile from "@/app/manage/[user_id]/posts/_lib/getProfile";
import ProfileViewer from "@/app/manage/[user_id]/settings/profile/_components/ProfileViewer";
import getPostWithBook from "@/app/posts/[postId]/_lib/getPostWithBook";
import { notFound } from "next/navigation";

type Props = {
  params: {
    userId: string;
    page: string;
  };
};

export default async function UserProfilePage({ params }: Props) {
  const userId = params.userId;
  let page = parseInt(params.page || "1");
  if (!page) page = 1;

  const profile = await getProfile(userId);
  if (!profile) notFound();

  const size = 10;
  const { postsWithBook, isLastPage } = await getUserPosts(userId, size, page);

  if (postsWithBook.length === 0) console.log("something wrong...");

  return (
    <div className="ml-5">
      <ProfileViewer profile={profile}></ProfileViewer>
      <div className="px-2 text-lg my-4">최근 작성한 글</div>
      <ul>
        {postsWithBook?.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </ul>
      <PaginationButtons baseURL={`/users/${userId}`} currentPage={page} isLastPage={isLastPage} />
    </div>
  );
}
