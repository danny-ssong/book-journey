import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPost } from "@/api/server/post";

import PostViewer from "@/app/posts/_components/PostViewer";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = params.id;
  if (!id) notFound();

  const post = await getPost(id);

  return <PostViewer post={post} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) return { title: "Book-journey" };

  return { title: `${post.title}` };
}
