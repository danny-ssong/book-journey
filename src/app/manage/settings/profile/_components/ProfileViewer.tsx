"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

export default function ProfileViewer({ user }: { user: User }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex h-[400px] flex-col">
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 overflow-hidden rounded-full">
              {/* <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" /> */}
            </div>
            <div className="flex flex-1 justify-center">
              <div className="text-xl">{user.profile.nickname}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex-1 py-2 text-center">{user.profile.bio}</div>
          <ul className="mt-2 flex justify-end">
            {user.profile.mostReadAuthors?.map((author) => (
              <li key={author.name} className="px-2 py-2">
                {author.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
