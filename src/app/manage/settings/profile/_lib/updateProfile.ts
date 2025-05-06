import { fetchWithAuth } from "@/utils/auth";

export default async function updateProfile(
  username: string,
  bio: string,
  image: File | null,
) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/profile`,
      {
        method: "PUT",
        body: JSON.stringify({
          username: username,
          bio: bio,
        }),
      },
    );
    return res.json();
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
