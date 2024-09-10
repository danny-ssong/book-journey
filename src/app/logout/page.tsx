import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const user = await supabase.auth.signOut();
  redirect("/");
}
