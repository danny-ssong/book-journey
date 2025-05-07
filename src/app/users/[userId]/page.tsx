import ProfileViewer from "@/app/manage/settings/profile/_components/ProfileViewer";
import { TabPanel, Tabs } from "@/app/_components/Tabs";
import UserPostDashboard from "@/app/_components/UserPostDashboard";
import UserPostList from "@/app/_components/UserPostList";
import { getUser } from "./_lib/user";

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

  const user = await getUser(userId);

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewer user={user} />
      <Tabs defaultActiveTab="recentPosts">
        <TabPanel tabId="recentPosts" label="최근 작성한 글">
          <UserPostList userId={userId} />
        </TabPanel>
        <TabPanel tabId="staticstics" label="독서 통계">
          <UserPostDashboard userId={userId} />
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
