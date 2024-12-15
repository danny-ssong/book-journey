import getUserOnServer from "@/app/_lib/getUserOnServer";
import { Profile } from "@/app/_models/supabaseTypes";
import Link from "next/link";

export default async function ProfileViewer({ profile }: { profile: Profile }) {
  return (
    <div className=" flex flex-col border bg-white">
      <div className="flex items-center justify-center px-4 py-2 border-b">
        <div className="rounded-full w-24 h-24 overflow-hidden">
          {/* <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" /> */}
        </div>
        <div className="flex flex-1 justify-center">
          <div className="text-xl">{profile.username}</div>
        </div>
      </div>
      <div className="px-2 py-2 w-full flex-1 min-h-[200px]">{profile.bio}</div>
      <ul className="flex mt-2 justify-end">
        {profile.mostRead_authors?.map((author) => (
          <li key={author} className="px-2 py-2">
            {author}
          </li>
        ))}
      </ul>
    </div>
  );
}
