"use client";
import dayjs from "dayjs";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";
import EditIcon from "@/app/_components/icons/EditIcon";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PostWithBook } from "@/types/post";
import { useEffect, useState } from "react";
import { getPost } from "@/api/post";
import { notFound, useParams } from "next/navigation";
import { useAuth } from "@/app/_hooks/useAuth";

export default function PostViewer({
  initPost,
}: {
  initPost: PostWithBook | undefined;
}) {
  const { user } = useAuth();
  const [post, setPost] = useState<PostWithBook | undefined>(initPost);
  const params = useParams();
  const postId = params.postId as string;
  if (!postId) notFound();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId);
      setPost(post);
    };

    if (initPost) setPost(initPost);
    else fetchPost();
  }, [initPost, postId]);

  if (!post) return <div>접근 불가 페이지입니다...</div>;

  const isOwner = post.user.id === user?.id;

  return (
    <article className="h-full w-full">
      <Card>
        <CardContent className="flex min-h-[60vh] flex-col p-6">
          <header className="flex flex-col">
            <div className="mb-1 flex flex-col justify-between sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-lg">{post.book.title}</h2>
                <p className="text-sm text-gray-600">{post.book.author.name}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <p className="text-xs">읽은 날짜</p>
                <p>{`${dayjs(post.startDate).format("YYYY")}년 ${dayjs(post.startDate).format("MM")}월`}</p>
              </div>
            </div>
            <div>
              <RatingViewer rating={post.rating!} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <p>{post.user.profile.nickname}</p>
            </div>
          </header>
          <Separator className="my-4" />
          <div className="flex flex-1 flex-col">
            <main className="flex-1">
              <h1 className="mb-5 text-xl font-semibold">{post.title}</h1>
              <p className="w-full whitespace-pre-line">{post.content}</p>
            </main>
            <footer className="mt-auto">
              {isOwner && (
                <div className="mt-5 flex w-full items-center justify-end">
                  <Link
                    href={`/posts/edit/${post.id}`}
                    className="relative rounded-md hover:bg-slate-100"
                  >
                    <EditIcon width={36} height={36} />
                  </Link>
                </div>
              )}
            </footer>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
