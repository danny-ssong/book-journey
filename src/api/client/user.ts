import { getUsers as getUsersAction } from "@/actions/profiles";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  return getUsersAction();
}
