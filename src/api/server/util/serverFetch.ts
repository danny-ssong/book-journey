"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect("/login");
    }
    if (res.status === 403) {
      throw new Error("접근 권한이 없습니다");
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "요청에 실패했습니다");
  }

  return res.json();
}
