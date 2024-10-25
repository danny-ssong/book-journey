import getUserOnServer from "@/app/_lib/getUserOnServer";
import { Profile } from "@/app/_types/supabaseTypes";
import Link from "next/link";

export default async function ProfileViewer({ profile }: { profile: Profile }) {
  const user = await getUserOnServer();
  return (
    <div>
      <div className=" flex flex-col border w-[600px] h-[500px]">
        <div className="flex items-center">
          <div className=" rounded-full w-24 h-24 overflow-hidden">
            <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="text-xl">{profile.username}</div>
          </div>
        </div>
        <div className="px-2 mt-5 py-2 w-full flex-1 border-t">{profile.bio}</div>
      </div>
    </div>
  );
}
