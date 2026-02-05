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
