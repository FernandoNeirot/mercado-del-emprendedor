"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import type { StoreVendor } from "@/features/tienda";
import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { getServerUser } from "@/shared/lib/auth";
import { optimizeAndUploadImage } from "@/shared/lib/uploadImageServer";
import { getBaseUrl } from "@/shared/configs/seo";
import { CACHE_REVALIDATE_24H } from "./constants";

export const getStoreById = cache(async (id: string): Promise<StoreVendor | null> => {
  const storeResponse = await fetch(`${getBaseUrl()}/api/stores/${id}`, {
    method: "GET",
    next: { revalidate: CACHE_REVALIDATE_24H },
  });
  const storeData = await storeResponse.json();
  return (storeData.data as StoreVendor) ?? null;
});

/** Lista las tiendas del usuario autenticado (para el dashboard). */
export async function getStores(): Promise<StoreVendor[]> {
  const user = await getServerUser();
  const uid = user?.uid;
  if (!uid) return [];

  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("stores")
      .where("userId", "==", uid)
      .orderBy("name")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
      } as StoreVendor;
    });
  } catch (error) {
    console.error("[getStores] Error:", error);
    return [];
  }
}

/** Crea una tienda. Devuelve la tienda con id asignado o lanza. */
export async function createStore(
  data: Omit<StoreVendor, "id" | "createdAt" | "userId"> & { createdAt?: Date }
): Promise<StoreVendor> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${getBaseUrl()}/api/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Error al crear la tienda");
  return json.data as StoreVendor;
}

/** Actualiza una tienda por slug (ej. feni-indumentaria-infantil). */
export async function updateStore(
  slug: string,
  data: Partial<Omit<StoreVendor, "id" | "createdAt" | "userId">>
): Promise<StoreVendor> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${getBaseUrl()}/api/stores/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Error al actualizar la tienda");
  return json.data as StoreVendor;
}

/** Sube y optimiza una imagen (WebP) para la tienda. Carpeta en Storage = tienda/{id}. Siempre guarda como logo.webp para pisar la anterior. */
export async function uploadStoreImage(
  formData: FormData
): Promise<{ url: string }> {
  const file = formData.get("image") as File | null;
  const folder = (formData.get("folder") as string) || "tienda";
  const fileName = (formData.get("fileName") as string) || "logo.webp";

  if (!file || !(file instanceof File) || file.size === 0) {
    throw new Error("No se proporcionó ninguna imagen");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen");
  }

  const arrayBuffer = await file.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const result = await optimizeAndUploadImage(imageBuffer, {
    folder,
    fileName,
    quality: 80,
  });

  return { url: result.url };
}
