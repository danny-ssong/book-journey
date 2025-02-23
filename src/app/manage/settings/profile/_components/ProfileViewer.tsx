import getUserOnServer from "@/app/_lib/getUserOnServer";
import { Profile } from "@/app/_models/supabaseTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function ProfileViewer({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 overflow-hidden rounded-full">
              {/* <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" /> */}
            </div>
            <div className="flex flex-1 justify-center">
              <div className="text-xl">{profile.username}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="min-h-[200px] w-full flex-1 py-2 text-center">
            {profile.bio}
          </div>
          <ul className="mt-2 flex justify-end">
            {profile.mostRead_authors?.map((author) => (
              <li key={author} className="px-2 py-2">
                {author}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
