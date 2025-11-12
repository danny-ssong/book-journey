"use client";

import { useAuth } from "@/hooks/useAuth";

import ProfileForm from "../_components/ProfileForm";

export default function ProfileEditPage() {
  const { user } = useAuth();
  return <ProfileForm profile={user!.profile} />;
}
