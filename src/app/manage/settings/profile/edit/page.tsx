"use client";

import { notFound } from "next/navigation";

import { useGetMe } from "@/react-query/me";

import ProfileForm from "../_components/ProfileForm";

export default function ProfileEditPage() {
  const { data: user, isPending, isError } = useGetMe();

  if (isPending) return <div>Loading...</div>;
  if (isError) notFound();

  return <ProfileForm profile={user.profile} />;
}
