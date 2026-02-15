"use client";

const baseUrl = () =>
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  /** Si el usuario confirmó su correo (verificación por email). */
  emailVerified?: boolean;
}

export type AuthResult = { user: AuthUser } | { error: string };

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${baseUrl()}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, action: "login" }),
  });
  const data = await response.json();
  if (!response.ok) {
    return { error: data.error ?? "Error al iniciar sesión" };
  }
  return {
    user: {
      uid: data.localId,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
    },
  };
}

export async function register(
  email: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${baseUrl()}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, action: "register" }),
  });
  const data = await response.json();
  if (!response.ok) {
    return { error: data.error ?? "Error al registrarse" };
  }
  // Enviar correo de verificación vía Firebase Client (solo en navegador)
  const sendError = await sendEmailVerificationAfterRegister(email, password);
  if (sendError) {
    return { error: sendError };
  }
  return {
    user: {
      uid: data.localId,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
    },
  };
}

/**
 * Envía (o reenvía) el correo de verificación de Firebase al usuario.
 * Hace sign-in en el cliente con email/password y llama a sendEmailVerification.
 * @returns Mensaje de error o null si se envió correctamente.
 */
export async function sendVerificationEmail(
  email: string,
  password: string
): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const { signInWithEmailAndPassword, sendEmailVerification } = await import(
      "firebase/auth"
    );
    const { auth } = await import("@/shared/configs/firebase");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const continueUrl = `${window.location.origin}/dashboard`;
    await sendEmailVerification(userCredential.user, {
      url: continueUrl,
      handleCodeInApp: false,
    });
    return null;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "No se pudo enviar el correo de verificación";
    return message;
  }
}

/**
 * Usado internamente después del registro. Reutiliza sendVerificationEmail.
 */
async function sendEmailVerificationAfterRegister(
  email: string,
  password: string
): Promise<string | null> {
  return sendVerificationEmail(email, password);
}

/**
 * Obtiene la sesión actual. Refresca el token si expiró.
 */
export async function getSession(): Promise<AuthUser | null> {
  const response = await fetch(`${baseUrl()}/api/auth/session`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.user ?? null;
}

/**
 * Cierra la sesión y borra las cookies.
 */
export async function logout(): Promise<void> {
  await fetch(`${baseUrl()}/api/auth`, {
    method: "DELETE",
    credentials: "include",
  });
}
