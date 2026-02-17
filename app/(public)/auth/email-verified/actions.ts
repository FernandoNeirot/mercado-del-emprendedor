"use server";

import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { initializeAdminApp } from "@/shared/configs/firebase-admin";
import {
  SESSION_COOKIE_NAME,
  decodeSessionPayload,
  encodeSessionPayload,
  COOKIE_OPTIONS,
  REFRESH_MAX_AGE,
} from "@/app/api/auth/utils";

const FIREBASE_TOKEN_URL = "https://securetoken.googleapis.com/v1/token";

interface FirebaseTokenResponse {
  id_token?: string;
  refresh_token?: string;
  error?: { message: string };
}

export async function refreshSession(): Promise<{ ok: boolean }> {
  try {
    const cookieStore = await cookies();
    const sessionPayload = decodeSessionPayload(
      cookieStore.get(SESSION_COOKIE_NAME)?.value ?? ""
    );
    const refreshToken = sessionPayload?.r ?? null;

    if (!refreshToken) {
      return { ok: false };
    }

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return { ok: false };
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const res = await fetch(`${FIREBASE_TOKEN_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = (await res.json()) as FirebaseTokenResponse;

    if (!res.ok || !data.id_token || !data.refresh_token) {
      return { ok: false };
    }

    const app = initializeAdminApp();
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(data.id_token);

    const payload = encodeSessionPayload({
      t: data.id_token,
      r: data.refresh_token,
      u: {
        uid: decodedToken.uid,
        email: decodedToken.email ?? null,
        displayName: decodedToken.name ?? null,
      },
    });

    cookieStore.set(SESSION_COOKIE_NAME, payload, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_MAX_AGE,
    });

    return { ok: true };
  } catch {
    return { ok: false };
  }
}
