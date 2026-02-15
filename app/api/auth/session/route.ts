import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { initializeAdminApp } from "@/shared/configs/firebase-admin";
import { setAuthCookies } from "../utils";

const FIREBASE_TOKEN_URL = "https://securetoken.googleapis.com/v1/token";

interface FirebaseTokenResponse {
  id_token?: string;
  refresh_token?: string;
  expires_in?: string;
  user_id?: string;
  error?: { message: string };
}

/**
 * GET /api/auth/session
 * Devuelve el usuario actual si está autenticado.
 * Si el session_token expiró pero hay refresh_token, intenta refrescar y devuelve el usuario.
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const app = initializeAdminApp();
    const auth = getAuth(app);

    // 1. Si hay session_token válido, verificar y devolver usuario
    if (sessionToken) {
      try {
        const decodedToken = await auth.verifyIdToken(sessionToken);
        const user = await auth.getUser(decodedToken.uid);
        return NextResponse.json({
          user: {
            uid: user.uid,
            email: user.email ?? null,
            displayName: user.displayName ?? null,
            emailVerified: user.emailVerified ?? false,
          },
        });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        // Si expiró o es inválido, intentar refresh
        if (
          !msg.includes("id-token-expired") &&
          !msg.includes("id-token-revoked")
        ) {
          return NextResponse.json({ user: null }, { status: 200 });
        }
      }
    }

    // 2. Intentar refrescar con refresh_token
    if (!refreshToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ user: null }, { status: 200 });
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
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decodedToken = await auth.verifyIdToken(data.id_token);
    const user = await auth.getUser(decodedToken.uid);

    const response = NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        emailVerified: user.emailVerified ?? false,
      },
    });

    setAuthCookies(response, data.id_token, data.refresh_token, {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
    });

    return response;
  } catch (error) {
    console.error("[auth/session] Error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
