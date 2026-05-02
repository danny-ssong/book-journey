import { getUserById } from "@/actions/profiles";

import { User } from "@/types/user";

export async function getUser(userId: string): Promise<User> {
  return getUserById(userId);
}
