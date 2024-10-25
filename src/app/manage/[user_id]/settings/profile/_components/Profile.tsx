"use client";
import Button from "@/app/_components/Button";
import getUserOnClient from "@/app/_lib/getUserOnClient";
import updateProfile from "@/app/actions/updateProfile";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Profile({ profile }: { profile: any }) {
  const [username, setUsername] = useState<string>(profile.username);
  const [bio, setBio] = useState<string>(profile.bio);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateProfile(username, bio, image);
    if (result) {
      const user = await getUserOnClient();
      const path = `/manage/${user?.id}/settings/profile`;
      router.push(path);
    } else {
      alert("프로필 수정 실패");
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col border w-[600px] h-[500px]">
          <div className="flex items-center">
            <div className=" rounded-full w-24 h-24 overflow-hidden">
              <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" />
            </div>
            <div className="flex flex-1 justify-center">
              <label className="text-xl mr-4">닉네임</label>
              <input className="text-xl" value={username} onChange={handleUsernameChange} />
            </div>
          </div>
          <textarea className="px-2 mt-5 py-2 w-full flex-1 resize-none border-t" value={bio} onChange={handleBioChange} />
        </div>
        <div className="flex justify-end mt-5">
          <Button>저장</Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
