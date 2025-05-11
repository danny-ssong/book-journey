let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/access-token/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("리프레시 토큰 만료");
    } catch (error) {
      console.warn("refresh token expired");
      // window.location.href = "/login";
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });
  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }
  return res;
}
