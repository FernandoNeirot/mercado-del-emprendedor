"use client";

import { useQuery } from "@tanstack/react-query";
import type { StoreVendor } from "@/features/tienda";
import { queryKeys } from "@/lib/query-keys";

type MyStoresResponse = {
  data: StoreVendor[];
  error: string | null;
  _servedAt?: number;
};

async function fetchMyStores(): Promise<MyStoresResponse> {
  const res = await fetch("/api/my-stores", { credentials: "include" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Error al cargar tiendas");
  return json;
}

/** Lista de tiendas del usuario vía GET /api/my-stores. React Query cachea por queryKeys.myStores(). */
export function useMyStores() {
  return useQuery({
    queryKey: queryKeys.myStores(),
    queryFn: fetchMyStores,
  });
}
