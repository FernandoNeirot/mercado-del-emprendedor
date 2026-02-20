"use server";

import { cache } from "react";
import type { StoreProduct } from "@/features/tienda";
import { getBaseUrl } from "@/shared/configs/seo";
import { CACHE_REVALIDATE_24H } from "./constants";
import { getAdminFirestore } from "@/shared/configs/firebase-admin";

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

function docDataToProduct(docId: string, data: Record<string, unknown>): StoreProduct {
  const raw = data as Record<string, unknown>;
  const toStr = (v: unknown): string =>
    v == null
      ? ""
      : typeof v === "string"
        ? v
        : ((v as { toDate?: () => Date })?.toDate?.()?.toISOString?.() ?? String(v));
  return {
    id: docId,
    name: (raw.name as string) ?? "",
    price: (raw.price as number) ?? 0,
    category: (raw.category as string) ?? "",
    imageUrl: (raw.imageUrl as string) ?? "",
    storeId: (raw.storeId as string) ?? "",
    slug: (raw.slug as string) ?? "",
    description: (raw.description as string) ?? "",
    richDescription: raw.richDescription as string | undefined,
    compareAtPrice: raw.compareAtPrice as number | undefined,
    images: Array.isArray(raw.images) ? (raw.images as string[]) : [],
    sku: raw.sku as string | undefined,
    stock: (raw.stock as number) ?? 0,
    featured: (raw.featured as boolean) ?? false,
    variants: raw.variants as StoreProduct["variants"],
    specs: raw.specs as StoreProduct["specs"],
    ratings: raw.ratings as StoreProduct["ratings"],
    createdAt: toStr(raw.createdAt),
    updatedAt: toStr(raw.updatedAt),
  };
}

export const getProductById = cache(
  async (idOrSlug: string): Promise<StoreProduct | null> => {
    try {
      const db = getAdminFirestore();
      const docRef = db.collection("products").doc(idOrSlug);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        const data = docSnap.data();
        return data ? docDataToProduct(docSnap.id, data) : null;
      }
      console.log("idOrSlug", idOrSlug);
      const snapshot = await db
        .collection("products")
        .where("slug", "==", idOrSlug)
        .limit(1)
        .get();
      console.log("snapshot", snapshot.docs);
      const doc = snapshot.docs[0];
      if (!doc) return null;
      const data = doc.data();
      return data ? docDataToProduct(doc.id, data) : null;
    } catch (err) {
      console.error("[getProductById]", err);
      return null;
    }
  }
);
