import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const user = await supabase.auth.signOut();
  console.log("user", user);

  return <div>logout</div>;
}
