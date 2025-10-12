import { Suspense } from "react";

import NewPostClient from "./_components/NewPostClient";

export default async function NewPostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPostClient />
    </Suspense>
  );
}
