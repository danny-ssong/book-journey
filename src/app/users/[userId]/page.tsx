import { getUserProfiles } from "@/app/actions/forGenerateStaticParams/getUserProfiles";
import PaginationButtons from "@/app/manage/posts/_components/PaginationButtons";
import PostPreview from "@/app/manage/posts/_components/PostPreview";
import getUserPosts from "@/app/manage/posts/_lib/getPosts";
import getProfile from "@/app/manage/posts/_lib/getProfile";
import ProfileViewer from "@/app/manage/settings/profile/_components/ProfileViewer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const { postsWithBook, isLastPage } = await getUserPosts(userId, size, page);

  return (
    <div className="ml-5 w-[600px]">
      <ProfileViewer profile={profile} />
      <div>
        <div className="px-2 text-lg my-4">최근 작성한 글</div>
        <ul className="bg-white">
          {postsWithBook && [...postsWithBook.reverse()]?.map((post) => <PostPreview key={post.id} post={post} />)}
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
