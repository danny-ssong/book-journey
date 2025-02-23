import dayjs from "dayjs";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";
import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import EditIcon from "@/app/_components/_icons/EditIcon";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function PostViewer({
  post,
}: {
  post: PostWithUserProfileAndBook;
}) {
  const user = await getUserOnServer();
  const isOwner = user?.id === post.user_id;

  return (
    <div className="h-full w-[800px]">
      <article>
        <Card>
          <CardContent className="flex min-h-[60vh] flex-col p-6">
            <header className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg">{post.book.title}</h2>
                  <p className="text-sm text-gray-600">{post.book.author}</p>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <p className="text-xs">읽은 날짜</p>
                  <p>{`${dayjs(post.start_date).format("YYYY")}년 ${dayjs(post.start_date).format("MM")}월`}</p>
                </div>
              </div>
              <div>
                <RatingViewer rating={post.rating!} />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <p>{post.profile.username}</p>
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
    </div>
  );
}
