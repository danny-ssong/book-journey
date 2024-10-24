import { Profile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ProfileViewer({ profile }: { profile: Profile }) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  return (
    <div>
      <div className=" flex flex-col border w-[600px] h-[500px]">
        <div className="flex items-center">
          <div className=" rounded-full w-24 h-24 overflow-hidden">
            <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" />
          </div>
          <div className="flex flex-1 justify-center">
            <label className="text-xl mr-4">닉네임</label>
            <div className="text-xl">{profile.username}</div>
          </div>
        </div>
        <div className="px-2 mt-5 py-2 w-full flex-1 border-t">{profile.bio}</div>
      </div>
      <div className="flex justify-end mt-5">
        <Link className="px-4 py-2 border rounded-full" href={`/manage/${user.user?.id}/settings/profile/edit`}>
          수정
        </Link>
      </div>
    </div>
  );
}
