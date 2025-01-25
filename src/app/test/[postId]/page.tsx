import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import getPost from "@/app/posts/[postId]/_lib/getPostWithBook";
import PostViewer from "@/app/posts/_components/PostViewer";
import { getAllPosts } from "@/app/_lib/forGenerateStaticParams/getAllPosts";
import { Metadata } from "next";

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

  return <PostViewer post={post} />;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (!posts) return [];

  return posts.map((post) => ({
    postId: String(post.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.postId);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title}` };
}
