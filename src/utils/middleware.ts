import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { type NextRequest, NextResponse } from "next/server";

import { jwtDecode } from "jwt-decode";

export async function updateSession(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  let response = NextResponse.next({ request });

  if (accessToken) {
    try {
      const decoded: { exp?: number } = jwtDecode(accessToken);
      const now = Math.floor(Date.now() / 1000);
      if (!decoded.exp || decoded.exp - now < 60) {
        const refreshResponse = await refreshAccessToken(request);
        if (refreshResponse) response = refreshResponse;
      }
    } catch (error) {
      console.error("토큰 디코딩 오류", error);
    }
  } else if (refreshToken) {
    const refreshResponse = await refreshAccessToken(request);
    if (refreshResponse) response = refreshResponse;
  }

  return response;
}

function applyCookies(
  setCookies: string[],
  request: NextRequest,
): NextResponse {
  for (const cookieStr of setCookies) {
    const parsed = parseSetCookie(cookieStr);
    if (!parsed) continue;
    request.cookies.set(parsed.name, parsed.value);
  }

  const response = NextResponse.next({ request });

  for (const cookieStr of setCookies) {
    const parsed = parseSetCookie(cookieStr);
    if (!parsed) continue;
    response.cookies.set(parsed.name, parsed.value, parsed);
  }

  return response;
}

async function refreshAccessToken(
  request: NextRequest,
): Promise<NextResponse | null> {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/access-token/refresh`,
      {
        method: "POST",
        headers: { Cookie: cookieHeader },
      },
    );

    if (!refreshResponse.ok) return null;

    const setCookies = refreshResponse.headers.getSetCookie();
    if (!setCookies) return null;

    return applyCookies(setCookies, request);
  } catch (error) {
    console.error("리프레시 토큰 만료", error);
    return null;
  }
}
