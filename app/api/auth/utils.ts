import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const SESSION_MAX_AGE = 60 * 60 * 24 * 5; // 5 días
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export function setAuthCookies(
  response: NextResponse,
  idToken: string,
  refreshToken: string,
  user: { uid: string; email?: string | null; displayName?: string | null }
) {
  response.cookies.set("session_token", idToken, {
    ...COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  });
  response.cookies.set("refresh_token", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_MAX_AGE,
  });
  const userData = JSON.stringify({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
  });
  response.cookies.set("user_data", userData, {
    ...COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAuthCookies(response: NextResponse) {
  const clearOpt = { ...COOKIE_OPTIONS, maxAge: 0 };
  response.cookies.set("session_token", "", clearOpt);
  response.cookies.set("refresh_token", "", clearOpt);
  response.cookies.set("user_data", "", clearOpt);
}
