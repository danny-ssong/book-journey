import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
