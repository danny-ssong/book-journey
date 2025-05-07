import { fetchWithAuth } from "@/utils/auth";

export default async function updateProfile(
  username: string,
  bio: string,
  image: File | null,
) {
  try {
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
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Failed to update profile: ${error.message}`);
    }
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
