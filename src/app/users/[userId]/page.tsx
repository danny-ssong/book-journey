import ProfileViewer from "@/app/manage/settings/profile/_components/ProfileViewer";
import { TabPanel, Tabs } from "@/app/_components/Tabs";
import UserPostDashboard from "@/app/_components/UserPostDashboard";
import { getUser } from "@/api/user";
import InfinitePostList from "@/app/_components/InfinitePostList";
import { Suspense } from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function UserProfilePage({ params }: Props) {
  const userId = params.userId;
  const user = await getUser(userId);
  if (!user) return <div>User not found</div>;

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewer user={user} />
      <Tabs defaultActiveTab="recentPosts">
        <TabPanel tabId="recentPosts" label="최근 작성한 글">
          <InfinitePostList type="user" userId={userId} />
        </TabPanel>
        <TabPanel tabId="staticstics" label="독서 통계">
          <Suspense fallback={<div>Loading...</div>}>
            <UserPostDashboard user={user} />
          </Suspense>
        </TabPanel>
      </Tabs>
    </div>
  );
}

// export async function generateStaticParams() {
//   const profiles = await getUsers();
//   if (!profiles) return [];
//   return profiles?.map((profile) => ({
//     userId: profile.user_id,
//   }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const profile = await getProfile(params.userId);
//   if (!profile) return { title: "User Not Found" };
//   return { title: `${profile.username}의 프로필` };
// }
