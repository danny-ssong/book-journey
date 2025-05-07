"use client";
import { useState, useEffect } from "react";
import ProfileForm from "../_components/ProfileForm";
import getMe from "@/app/_lib/getUserProfile";
import { User } from "@/types/user";

export default function ProfileEditPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return <ProfileForm profile={user.profile} />;
}
