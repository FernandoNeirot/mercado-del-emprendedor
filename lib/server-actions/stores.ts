"use server";

import { cache } from "react";
import type { StoreVendor } from "@/features/tienda";
import { CACHE_REVALIDATE_24H } from "./constants";

const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL;

export const getStoreById = cache(async (id: string): Promise<StoreVendor | null> => {
  const storeResponse = await fetch(`${baseUrl()}/api/stores/${id}`, {
    method: "GET",
    next: { revalidate: CACHE_REVALIDATE_24H },
  });
  const storeData = await storeResponse.json();
  return (storeData.data as StoreVendor) ?? null;
});

/** Lista todas las tiendas (para el dashboard). */
export async function getStores(): Promise<StoreVendor[]> {
  const res = await fetch(`${baseUrl()}/api/stores`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (!res.ok) return [];
  const list = (json.data ?? []) as StoreVendor[];
  return list;
}

/** Crea una tienda. Devuelve la tienda con id asignado o lanza. */
export async function createStore(
  data: Omit<StoreVendor, "id" | "createdAt"> & { createdAt?: Date }
): Promise<StoreVendor> {
  const res = await fetch(`${baseUrl()}/api/stores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Error al crear la tienda");
  return json.data as StoreVendor;
}

/** Actualiza una tienda por slug (ej. feni-indumentaria-infantil). */
export async function updateStore(
  slug: string,
  data: Partial<Omit<StoreVendor, "id" | "createdAt">>
): Promise<StoreVendor> {
  const res = await fetch(`${baseUrl()}/api/stores/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Error al actualizar la tienda");
  return json.data as StoreVendor;
}
