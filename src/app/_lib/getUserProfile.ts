import { User } from "@/types/user";

export default async function getMe(): Promise<User | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`,
    { credentials: "include" },
  );

  if (!res.ok) throw new Error("Failed to fetch user");

  const user = await res.json();
  return user;
}
