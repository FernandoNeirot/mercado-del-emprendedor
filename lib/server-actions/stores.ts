"use server";

import { cache } from "react";
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
  const user = await getServerUser();
  const uid = user?.uid;
  if (!uid) throw new Error("No autorizado");

  const db = getAdminFirestore();
  const { userId: _omit, ...rest } = data as Record<string, unknown>;
  const storeData = { ...rest, userId: uid };
  const docRef = await db.collection("stores").add(storeData);

  const created = storeData as Record<string, unknown>;
  const createdAt = created.createdAt ?? new Date();
  return { id: docRef.id, ...created, createdAt } as StoreVendor;
}

/** Actualiza una tienda por slug (ej. feni-indumentaria-infantil). */
export async function updateStore(
  slug: string,
  data: Partial<Omit<StoreVendor, "id" | "createdAt" | "userId">>
): Promise<StoreVendor> {
  const user = await getServerUser();
  const uid = user?.uid;
  if (!uid) throw new Error("No autorizado");

  const db = getAdminFirestore();
  const snapshot = await db
    .collection("stores")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  const doc = snapshot.docs[0];
  if (!doc) throw new Error("Tienda no encontrada");

  const storeData = doc.data();
  const storeUserId = storeData?.userId;
  if (storeUserId && storeUserId !== uid) {
    throw new Error("No tenés permiso para editar esta tienda");
  }

  const { id: _omit, userId: _omitUid, ...updateData } = data as Record<string, unknown>;
  await doc.ref.update(updateData);

  const merged = { ...storeData, ...updateData };
  const createdAt = storeData?.createdAt?.toDate?.() ?? storeData?.createdAt;
  return { id: doc.id, ...merged, createdAt } as StoreVendor;
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
