import { Metadata } from "next";

import { TabPanel, Tabs } from "@/components/common/Tabs";
import InfinitePostList from "@/components/post/InfinitePostList";
import ProfileViewer from "@/components/post/ProfileViewer";
import UserPostDashboard from "@/components/user/UserPostDashboard";

import { getUser, getUsers } from "@/api/user";
import { User } from "@/types/user";

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
          <UserPostDashboard user={user} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

// 유저 프로필은 실시간으로 업데이트할 필요 없으므로, 1시간 캐싱 유효
export const revalidate = 3600;

export async function generateStaticParams() {
  const users = await getUsers();

  return users.map((user) => ({
    userId: user.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUser(params.userId);
  if (!user) return { title: "User Not Found" };
  return { title: `${user.profile.nickname}의 프로필` };
}
