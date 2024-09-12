import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return <div>feed {data.user?.email}</div>;
}
