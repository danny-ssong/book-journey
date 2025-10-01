import { User } from "@/types/user";
import { fetchWithAuth } from "@/utils/auth";

export async function getMe(): Promise<User | null> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`,
  );

  if (!res.ok) throw new Error((await res.json()).message);

  const user = await res.json();
  return user;
}

export async function updateProfile(
  username: string,
  bio: string,
  image: File | null,
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/profiles/me`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        username: username,
        bio: bio,
      }),
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}
