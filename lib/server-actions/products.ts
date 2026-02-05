"use server";

import { cache } from "react";
import type { StoreProduct } from "@/features/tienda";
import { CACHE_REVALIDATE_24H } from "./constants";

const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL;

export const getProductsByStoreId = cache(
  async (storeId: string): Promise<StoreProduct[]> => {
    const productsResponse = await fetch(
      `${baseUrl()}/api/products/byStore/${storeId}`,
      { method: "GET", next: { revalidate: CACHE_REVALIDATE_24H } }
    );
    const productsData = await productsResponse.json();
    return (productsData.data as StoreProduct[]) ?? [];
  }
);
