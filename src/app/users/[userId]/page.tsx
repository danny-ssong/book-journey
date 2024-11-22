import { getUserProfiles } from "@/app/_lib/forGenerateStaticParams/getUserProfiles";
import PaginationButtons from "@/app/manage/posts/_components/PaginationButtons";
import ExapndedPostPreviewForManage from "@/app/manage/posts/_components/PostPreviewForManage";
import getProfile from "@/app/manage/posts/_lib/getProfile";
import ProfileViewer from "@/app/manage/settings/profile/_components/ProfileViewer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import getPosts from "@/app/actions/getPosts";

type Props = {
  params: {
    userId: string;
  };
  searchParams: {
    page: string;
  };
};

export default async function UserProfilePage({ params, searchParams }: Props) {
  const userId = params.userId;

  let page = parseInt(searchParams.page || "1");
  if (!page) page = 1;

  const profile = await getProfile(userId);
  if (!profile) notFound();

  const size = 5;
  const { posts, isLastPage } = await getPosts(size, page, userId);

  return (
    <div className="ml-5 w-[600px]">
      <ProfileViewer profile={profile} />
      <div>
        <h1 className="px-2 text-lg my-4">최근 작성한 글</h1>
        <ul className="bg-white">
          {posts.map((post) => (
            <ExapndedPostPreviewForManage key={post.id} post={post} isOwner={userId === post.user_id} />
          ))}
        </ul>
      </div>
      <PaginationButtons baseURL={`/users/${userId}`} currentPage={page} isLastPage={isLastPage} />
    </div>
  );
}

export async function generateStaticParams() {
  const profiles = await getUserProfiles();
  if (!profiles) return [];
  return profiles?.map((profile) => ({
    userId: profile.user_id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfile(params.userId);
  if (!profile) return { title: "User Not Found" };
  return { title: `${profile.username}의 프로필` };
}
