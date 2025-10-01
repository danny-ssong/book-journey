export async function getUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/${userId}`,
  );
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`);
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
