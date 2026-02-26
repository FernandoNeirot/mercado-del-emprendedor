/** Claves de React Query para invalidar o actualizar caché. */
export const queryKeys = {
  myStores: () => ["my-stores"] as const,
  store: (idOrSlug: string) => ["store", idOrSlug] as const,
  products: (storeId: string) => ["products", storeId] as const,
  product: (idOrSlug: string) => ["product", idOrSlug] as const,
} as const;
