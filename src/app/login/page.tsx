import { redirect } from "next/navigation";

export default function Page() {
  redirect(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`);
}
