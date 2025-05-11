"use client";
import { User } from "@/types/user";
import { fetchWithAuth } from "@/utils/auth";

export default async function getMe(): Promise<User | null> {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`,
    );

    if (!res.ok) throw new Error("Failed to fetch user");

    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
