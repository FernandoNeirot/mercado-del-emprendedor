"use server";

import { revalidatePath } from "next/cache";
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

export async function updateProduct(
  idOrSlug: string,
  data: Partial<Omit<StoreProduct, "id" | "storeId" | "createdAt">>
): Promise<StoreProduct | null> {
  try {
    const db = getAdminFirestore();
    let docRef = db.collection("products").doc(idOrSlug);
    let docSnap = await docRef.get();

    if (!docSnap.exists) {
      const bySlug = await db
        .collection("products")
        .where("slug", "==", idOrSlug)
        .limit(1)
        .get();
      const doc = bySlug.docs[0];
      if (!doc) return null;
      docRef = doc.ref;
      docSnap = doc;
    }

    const { id: _omit, storeId: _omitStore, createdAt: _omitCreated, ...rest } =
      data as Record<string, unknown>;
    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }
    await docRef.update(updateData);

    revalidatePath("/dashboard/tienda", "layout");

    const updated = await docRef.get();
    const raw = updated.data();
    if (!raw) return null;

    const d = raw as Record<string, unknown>;
    const toStr = (v: unknown): string =>
      v == null
        ? ""
        : typeof v === "string"
          ? v
          : (v as { toDate?: () => Date })?.toDate?.()?.toISOString?.() ?? String(v);

    return {
      id: updated.id,
      name: (d.name as string) ?? "",
      price: (d.price as number) ?? 0,
      category: (d.category as string) ?? "",
      imageUrl: (d.imageUrl as string) ?? "",
      storeId: (d.storeId as string) ?? "",
      slug: (d.slug as string) ?? "",
      description: (d.description as string) ?? "",
      richDescription: d.richDescription as string | undefined,
      compareAtPrice: d.compareAtPrice as number | undefined,
      images: Array.isArray(d.images) ? (d.images as string[]) : [],
      sku: d.sku as string | undefined,
      stock: (d.stock as number) ?? 0,
      featured: (d.featured as boolean) ?? false,
      variants: d.variants as StoreProduct["variants"],
      specs: d.specs as StoreProduct["specs"],
      ratings: d.ratings as StoreProduct["ratings"],
      createdAt: toStr(d.createdAt),
      updatedAt: toStr(d.updatedAt),
    };
  } catch (err) {
    console.error("[updateProduct]", err);
    return null;
  }
}
