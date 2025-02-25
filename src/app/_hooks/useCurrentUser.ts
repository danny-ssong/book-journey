import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import getUserOnClient from "../_lib/getUserOnClient";

export default function useUserOnClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await getUserOnClient();
      setUser(user);
    }
    getUser();
  }, []);

  return user;
}
