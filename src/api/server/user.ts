import { User } from "@/types/user";

import { serverFetch } from "./util/serverFetch";

export async function getUser(userId: string): Promise<User> {
  return serverFetch<User>(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/${userId}`,
  );
}
