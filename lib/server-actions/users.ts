"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import { getBaseUrl } from "@/shared/configs/seo";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export const loginUser = cache(
  async (
    email: string,
    password: string
  ): Promise<{ user: AuthUser } | { error: string }> => {
    const response = await fetch(`${getBaseUrl()}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
);

export const registerUser = cache(
  async (
    email: string,
    password: string
  ): Promise<{ user: AuthUser } | { error: string }> => {
    const response = await fetch(`${getBaseUrl()}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
);

export const getSession = cache(async (): Promise<AuthUser | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const response = await fetch(`${getBaseUrl()}/api/auth/session`, {
    method: "GET",
    cache: "no-store",
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  const data = await response.json();
  return data.user ?? null;
});

export const logoutUser = cache(async (): Promise<void> => {
  await fetch(`${getBaseUrl()}/api/auth`, { method: "DELETE" });
});

