import UserPostDashboard from "@/app/_components/UserPostDashboard";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import { notFound } from "next/navigation";

export default async function StaticsticsPage() {
  const user = await getUserOnServer();
  if (!user) notFound();

  return <UserPostDashboard userId={user.id} />;
}
