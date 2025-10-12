import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { User } from "@/types/user";

type Props = {
  user: User;
};

export default function ProfileViewer({ user }: Props) {
  return (
    <Card className="p-4">
      <div className="flex h-20 items-center justify-center">
        <div className="text-xl">{user.profile.nickname}</div>
      </div>
      <Separator className="my-4" />

      <div className="min-h-[200px] w-full resize-none p-2">
        {user.profile.bio}
      </div>
    </Card>
  );
}
