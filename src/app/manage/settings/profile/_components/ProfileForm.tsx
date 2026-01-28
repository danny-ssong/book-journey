"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useUpdateProfile } from "@/api/client/me.queries";
import { Profile } from "@/types/user";

type Props = {
  profile: Profile;
};

export default function ProfileForm({ profile }: Props) {
  const router = useRouter();
  const { mutateAsync: updateProfileMutation } = useUpdateProfile();
  const [username, setUsername] = useState<string>(profile.nickname ?? "");
  const [bio, setBio] = useState<string>(profile.bio ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfileMutation({
        nickname: username,
        bio: bio,
      });
      toast.success("프로필 수정되었습니다.");
      router.push(`/manage/settings/profile`);
    } catch (error) {
      console.error(error);
      toast.error("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4">
        <div className="flex h-20 items-center justify-center">
          <label className="mb-2 mr-4 text-nowrap text-xl" htmlFor="nickname">
            닉네임
          </label>
          <input
            className="border px-2 py-1"
            id="nickname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <textarea
          className="min-h-[200px] w-full resize-none border p-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개를 입력해주세요."
        />
      </Card>
      <div className="mt-5 flex justify-end">
        <Button type="submit">저장</Button>
      </div>
    </form>
  );
}
