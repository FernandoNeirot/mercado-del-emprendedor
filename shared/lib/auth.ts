import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { initializeAdminApp } from "../configs/firebase-admin";
import {
  SESSION_COOKIE_NAME,
  decodeSessionPayload,
} from "@/app/api/auth/utils";

interface FirebaseJWTPayload {
  sub?: string;
  name?: string;
  user_id?: string;
  uid?: string;
  [key: string]: unknown;
}

export interface ServerUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  /** Si el usuario confirmó su correo (verificación por email). */
  emailVerified: boolean;
}

function decodeJWT(token: string): FirebaseJWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const payload = parts[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const decoded = Buffer.from(paddedBase64, "base64").toString("utf-8");

    return JSON.parse(decoded) as FirebaseJWTPayload;
  } catch (error) {
    console.error("[decodeJWT] Error decodificando token:", error);
    return null;
  }
}

function getSessionTokenFromCookies(cookieStore: Awaited<ReturnType<typeof cookies>>): string | null {
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) return null;
  const decoded = decodeSessionPayload(raw);
  return decoded?.t ?? null;
}

export async function getUserIdFromSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = getSessionTokenFromCookies(cookieStore);

    if (!token) {
      return null;
    }

    const payload = decodeJWT(token);

    if (!payload) {
      return null;
    }

    return payload.sub || payload.user_id || payload.uid || null;
  } catch (error) {
    console.error("[getUserIdFromSession] Error obteniendo userId:", error);
    return null;
  }
}

export async function getSessionToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return getSessionTokenFromCookies(cookieStore);
  } catch (error) {
    console.error("[getSessionToken] Error obteniendo token:", error);
    return null;
  }
}

export async function getServerUser(): Promise<ServerUser | null> {
  try {
    const token = await getSessionToken();
    if (!token) {
      return null;
    }

    let app;
    try {
      app = initializeAdminApp();
    } catch (initError) {
      console.error("[getServerUser] Firebase Admin no disponible (revisa FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY):", initError);
      return null;
    }
    const auth = getAuth(app);
    try {
      const decodedToken = await auth.verifyIdToken(token);
      // Construir usuario desde el token verificado; evitar auth.getUser() porque en Cloud Run
      // esa llamada usa OAuth2 y puede fallar con "DECODER routines::unsupported" al usar la clave.
      return {
        uid: decodedToken.uid,
        displayName: decodedToken.name ?? null,
        email: decodedToken.email ?? null,
        emailVerified: decodedToken.email_verified ?? false,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (
        !errorMessage.includes("id-token-expired") &&
        !errorMessage.includes("id-token-revoked") &&
        !errorMessage.includes("argument-error")
      ) {
        console.error("[getServerUser] Error verificando token:", error);
      }

      return null;
    }
  } catch (error) {
    console.error("[getServerUser] Error obteniendo usuario:", error);
    return null;
  }
}
