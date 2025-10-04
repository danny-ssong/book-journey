"use client";
import ProfileForm from "../_components/ProfileForm";
import { useAuth } from "@/app/_hooks/useAuth";

export default function ProfileEditPage() {
  const { user } = useAuth();
  return <ProfileForm profile={user!.profile} />;
}
