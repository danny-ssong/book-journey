import DateViewer from "@/components/post/DateViewer";
import PostContent from "@/components/post/PostContent";
import PostTitle from "@/components/post/PostTitle";
import Rating from "@/components/post/Rating";
import UserName from "@/components/post/UserName";
import { Card } from "@/components/ui/card";

import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export default function PostCardForBook({ post }: Props) {
  return (
    <article>
      <Card className="flex flex-col gap-4 px-4 py-2">
        <div className="flex justify-between">
          <div>
            <Rating rating={post.rating} />
            <UserName
              userName={post.user.profile.nickname}
              userId={post.user.id}
              asLink
            />
          </div>
          <DateViewer date={post.updatedAt} label="최근 수정일" />
        </div>
        <PostTitle post={post} asLink />
        <PostContent post={post} maxLines={3} asLink />
      </Card>
    </article>
  );
}
