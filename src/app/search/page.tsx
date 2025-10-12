import { Suspense } from "react";

import SearchClient from "./_components/SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>검색 중...</div>}>
      <SearchClient />
    </Suspense>
  );
}
