import { createClient } from "@/utils/supabase/server";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { [key: string]: string | undefined } }) {
  const supabse = createClient();
  const { data, error } = await supabse.auth.getUser();
  if (data.user?.id !== params.user_id) {
    return <>not avaliable</>;
  }
  return <>{children}</>;
}
