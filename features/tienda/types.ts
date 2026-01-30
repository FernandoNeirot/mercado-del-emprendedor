export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface StoreVendor {
  id: string;
  name: string;
  logoUrl: string;
  /** URL del banner de la tienda (opcional; si no hay, se usa un fondo neutro) */
  bannerUrl?: string;
  tagline: string;
  verified?: boolean;
  stats: {
    sales: string;
    yearsInBusiness: string;
    location: string;
  };
  story?: {
    founderName: string;
    paragraphs: string[];
  };
  deliveryDays: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  processGallery?: { type: "image" | "video"; url: string; thumbnailUrl: string }[];
  paymentMethods?: ("transferencia" | "efectivo" | "mercadopago")[];
}
