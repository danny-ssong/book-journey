import { Metadata } from "next";

import RecentPostsSection from "./_components/RecentPostsSection";

export const dynamic = "force-dynamic";

export default async function HOME() {
  return <RecentPostsSection />;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` };
}

// export const revalidate = 60;
