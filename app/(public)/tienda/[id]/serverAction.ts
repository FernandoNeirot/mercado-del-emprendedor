"use server";

import type { StoreProduct, StoreVendor } from "@/features/tienda";

export async function getStoreById(id: string): Promise<StoreVendor | null> {
  const storeResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${id}`,
    { method: "GET", next: { revalidate: 86400 } }
  );
  const storeData = await storeResponse.json();
  return (storeData.data as StoreVendor) ?? null;
}

export async function getProductsByStoreId(
  storeId: string
): Promise<StoreProduct[]> {
  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/byStore/${storeId}`,
    { method: "GET", next: { revalidate: 86400 } }
  );
  const productsData = await productsResponse.json();
  return (productsData.data as StoreProduct[]) ?? [];
}
