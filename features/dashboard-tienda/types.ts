import type { StoreVendor } from "@/features/tienda";

const defaultStats: StoreVendor["stats"] = {
  sales: "",
  yearsInBusiness: "",
  location: "",
  clients: "",
};

/** Valores por defecto para crear una tienda nueva. */
export function getDefaultStoreForm(): Omit<StoreVendor, "id" | "createdAt"> & {
  createdAt?: Date;
} {
  return {
    slug: "",
    name: "",
    tagline: "",
    category: "indumentaria",
    isActive: true,
    logoUrl: "",
    bannerUrl: "",
    deliveryDays: [],
    availability: [],
    stats: { ...defaultStats },
  };
}

/** Form state: mismo shape que StoreVendor pero editable. */
export type StoreFormState = Partial<StoreVendor> & {
  name: string;
  slug: string;
  tagline: string;
  stats: StoreVendor["stats"];
};
