import { UpdateProfile, User } from "@/types/user";

export async function getMe(): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error((await res.json()).message);

  const user = await res.json();
  return user;
}

export async function updateProfile(updateProfile: UpdateProfile) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/profiles/me`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(updateProfile),
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error((await res.json()).message);

  return res.json();
}

export async function logout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) throw new Error((await res.json()).message);
}
