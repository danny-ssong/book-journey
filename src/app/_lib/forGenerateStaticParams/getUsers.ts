"use server";

export async function getUsers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`,
    );

    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();
    return users;
  } catch (error: any) {
    console.error(`${error} \n${error.message}`);
    return;
  }
}
