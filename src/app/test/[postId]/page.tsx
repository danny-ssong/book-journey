import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPost } from "@/api/client/post";

import PostViewer from "@/app/posts/_components/PostViewer";

type Props = {
  params: {
    postId: string;
  };
};

export default async function Page({ params }: Props) {
  const postId = params?.postId;
  if (!postId) return notFound();

  const post = await getPost(postId);
  if (!post) return notFound();

  return <PostViewer post={post} />;
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
