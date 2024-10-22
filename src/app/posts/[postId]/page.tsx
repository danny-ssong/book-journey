import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import getPostWithBook from "./_lib/getPostWithBook";
import PostViewer from "../_components/PostViewer";

export default async function Page({ params }: { params: { [key: string]: string | undefined } }) {
  const postId = params?.postId;
  if (!postId) notFound();

  const postWithBook = await getPostWithBook(postId);
  if (!postWithBook) notFound();

  return (
    <div className="w-[800px] px-4 flex flex-col gap-5">
      <PostViewer post={postWithBook} />
    </div>
  );
}
