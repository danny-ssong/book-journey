export async function getUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/${userId}`,
  );
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`);
  return res.json();
}
