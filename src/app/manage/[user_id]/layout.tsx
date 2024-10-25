import getUserOnServer from "@/app/_lib/getUserOnServer";
import { createClient } from "@/utils/supabase/server";

type Props = {
  children: React.ReactNode;
  params: {
    user_id: string;
  };
};

export default async function Layout({ children, params }: Props) {
  const supabse = createClient();
  const user = await getUserOnServer();
  if (user?.id !== params.user_id) {
    return <>please login</>;
  }
  return <>{children}</>;
}
