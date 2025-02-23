"use client";
import { Button } from "@/components/ui/button";
import getUserOnClient from "@/app/_lib/getUserOnClient";
import updateProfile from "@/app/actions/updateProfile";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Profile({ profile }: { profile: any }) {
  const [username, setUsername] = useState<string>(profile.username);
  const [bio, setBio] = useState<string>(profile.bio);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateProfile(username, bio, image);
    if (result) {
      const path = `/manage/settings/profile`;
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center border-b">
              <div className="h-24 w-24 overflow-hidden rounded-full">
                {/* <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" /> */}
              </div>
              <div className="flex flex-1 justify-center">
                <label className="mr-4 text-xl">닉네임</label>
                <input
                  className="border text-xl"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            <textarea
              className="min-h-[300px] w-full flex-1 resize-none border px-2 py-2"
              value={bio}
              onChange={handleBioChange}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <Button>저장</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default Profile;
