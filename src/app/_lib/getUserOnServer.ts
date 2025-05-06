"use server";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export default async function getUserOnServer(): Promise<User | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`;
    const fetchOptions = {
      headers: {
        Cookie: cookies().toString(),
      },
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error("Failed to fetch user");

    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
