export const dynamic = "force-dynamic";

import { Metadata } from "next";
import RecentPostsSection from "./_components/RecentPostsSection";

export default async function HOME() {
  return <RecentPostsSection />;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` };
}

// export const revalidate = 60;
