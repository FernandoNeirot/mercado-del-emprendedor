"use client";

const baseUrl = () =>
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
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
  return {
    user: {
      uid: data.localId,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
    },
  };
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
