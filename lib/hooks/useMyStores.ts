"use client";

import { useQuery } from "@tanstack/react-query";
import type { StoreVendor } from "@/features/tienda";
import { queryKeys } from "@/lib/query-keys";
import { getStores } from "@/lib/server-actions/stores";

/** Lista de tiendas del usuario vía server action getStores. React Query cachea por queryKeys.myStores(). */
export function useMyStores() {
  return useQuery({
    queryKey: queryKeys.myStores(),
    queryFn: (): Promise<StoreVendor[]> => getStores(),
  });
}
