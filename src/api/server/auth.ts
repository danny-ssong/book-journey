"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          Cookie: cookies().toString(),
        },
      });

      if (!res.ok) throw new Error("리프레시 토큰 만료");
    } catch (error) {
      console.warn(error);
      throw new Error("인증이 필요합니다");
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

export async function fetchWithAuthOnServer(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookies().toString(),
    },
  });

  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Cookie: cookies().toString(),
      },
    });
  }

  return res;
}

export default async function getMeOnServer(): Promise<User | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`;
  const fetchOptions = {
    headers: {
      Cookie: cookies().toString(),
    },
  };
  const res = await fetch(url, fetchOptions);
  if (!res.ok) throw new Error((await res.json()).message);

  const user = await res.json();
  return user;
}
