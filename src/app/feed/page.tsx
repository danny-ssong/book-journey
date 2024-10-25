import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import getUserOnServer from "../_lib/getUserOnServer";

export default async function Page() {
  const supabase = createClient();
  const user = await getUserOnServer();

  return <div>feed {user?.email}</div>;
}
