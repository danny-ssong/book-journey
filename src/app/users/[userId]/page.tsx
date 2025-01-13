import { getUserProfiles } from "@/app/_lib/forGenerateStaticParams/getUserProfiles";
import PaginationButtons from "@/app/manage/posts/_components/PaginationButtons";
import ExpandedPostPreviewForManage from "@/app/manage/posts/_components/ExapndedPostPreviewForManage";
import getProfile from "@/app/manage/posts/_lib/getProfile";
import ProfileViewer from "@/app/manage/settings/profile/_components/ProfileViewer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import getPosts from "@/app/actions/getPosts";
import { TabPanel, Tabs } from "@/app/_components/Tabs";
import UserPostDashboard from "@/app/_components/UserPostDashboard";
import PostPreview from "@/app/(home)/_components/PostPreivew";

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
    <div className="flex flex-col gap-4">
      <ProfileViewer profile={profile} />
      <Tabs defaultActiveTab="recentPosts">
        <TabPanel tabId="recentPosts" label="최근 작성한 글">
          <ul className="bg-white">
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </ul>
          <PaginationButtons
            baseURL={`/users/${userId}`}
            currentPage={page}
            isLastPage={isLastPage}
          />
        </TabPanel>
        <TabPanel tabId="staticstics" label="독서 통계">
          <UserPostDashboard userId={userId} />
        </TabPanel>
      </Tabs>
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
