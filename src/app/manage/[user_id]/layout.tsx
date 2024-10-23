import { createClient } from "@/utils/supabase/server";

type Props = {
  children: React.ReactNode;
  params: {
    user_id: string;
  };
};

export default async function Layout({ children, params }: Props) {
  const supabse = createClient();
  const { data, error } = await supabse.auth.getUser();
  if (data.user?.id !== params.user_id) {
    return <>please login</>;
  }
  return <>{children}</>;
}
