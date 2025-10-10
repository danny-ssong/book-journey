import { Metadata } from "next";
import { notFound } from "next/navigation";

import PostViewer from "@/app/posts/_components/PostViewer";

import { getPost } from "@/api/post";

type Props = {
  params: {
    postId: string;
  };
};

export default async function Page({ params }: Props) {
  const postId = params?.postId;
  if (!postId) notFound();

  const post = await getPost(postId);
  if (!post) notFound();

  return <PostViewer initPost={post} />;
}

// export async function generateStaticParams() {
//   const posts = await getPosts(999);
//   if (!posts) return [];

//   return posts.data.map((post) => ({
//     postId: String(post.id),
//   }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const post = await getPost(params.postId);
//   if (!post) return { title: "Post Not Found" };
//   return { title: `${post.title}` };
// }
