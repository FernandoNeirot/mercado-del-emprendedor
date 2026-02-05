import type { StoreVendor, StoreProduct } from "./types";

// Mock data - en producción vendría de API/DB
export async function getStoreById(id: string): Promise<StoreVendor | null> {  
  return null;
}

export async function getStoreProducts(storeId: string): Promise<StoreProduct[]> {
  return [];
}
