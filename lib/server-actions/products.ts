"use server";

import { cache } from "react";
import type { StoreProduct } from "@/features/tienda";
import { getBaseUrl } from "@/shared/configs/seo";
import { CACHE_REVALIDATE_24H } from "./constants";

export const getProductsByStoreId = cache(
  async (storeId: string): Promise<StoreProduct[]> => {
    const productsResponse = await fetch(
      `${getBaseUrl()}/api/products/byStore/${storeId}`,
      { method: "GET", next: { revalidate: CACHE_REVALIDATE_24H } }
    );
    const productsData = await productsResponse.json();
    return (productsData.data as StoreProduct[]) ?? [];
  }
);

export const getProductById = cache(
  async (idOrSlug: string): Promise<StoreProduct | null> => {
    try {
      const response = await fetch(
        `${getBaseUrl()}/api/products/${idOrSlug}`,
        { method: "GET", next: { revalidate: CACHE_REVALIDATE_24H } }
      );
      const json = await response.json();
      return (json.data as StoreProduct) ?? null;
    } catch (err) {
      console.error("[getProductById]", err);
      return null;
    }
  }
);
