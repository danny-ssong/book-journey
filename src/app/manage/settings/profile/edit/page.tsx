"use client";

import { useAuthContext } from "@/providers/AuthProvider";

import ProfileForm from "../_components/ProfileForm";

export default function ProfileEditPage() {
  const user = useAuthContext();

  return <ProfileForm profile={user.profile} />;
}
