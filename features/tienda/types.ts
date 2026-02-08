export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  storeId: string; // Relación con la tienda
  slug: string; // Ej: "remera-algodon-negra"
  description: string;
  richDescription?: string; // HTML o Markdown para descripciones largas
  compareAtPrice?: number; // Precio "antes" para mostrar ofertas
  images: string[]; // Array de URLs (mínimo 3-4 para un buen detalle)
  
  // --- Nuevos campos sugeridos ---
  sku?: string; // Código único de inventario
  stock: number;
  featured: boolean; // Para mostrar en "Destacados" de la tienda
  
  // Variantes (Ej: { type: 'Talle', options: ['S', 'M', 'L'] })
  variants?: {
    name: string; 
    options: string[];
  }[];

  // Especificaciones técnicas o atributos
  specs?: {
    label: string; // Ej: "Material"
    value: string; // Ej: "100% Algodón"
  }[];

  ratings?: {
    average: number;
    count: number;
  };
  
  createdAt: string; 
  updatedAt: string;
}
export interface StoreAvailability {
  day: string;
  availability: string;
}
export interface StoreVendor {
  id: string;
  slug: string;
  category: string;  
  isActive: boolean;
  createdAt: Date;
  name: string;
  logoUrl: string;
  bannerUrl?: string;
  tagline: string;
  verified?: boolean;
  stats: {
    sales: string;
    yearsInBusiness: string;
    location: string;
    clients: string;
  };
  story?: {
    founderName: string;
    paragraphs: string[];
  };
  deliveryDays: string[];
  availability: StoreAvailability[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  personalInfo?: {
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  paymentMethods?: ("transferencia" | "efectivo" | "mercadopago")[];
}
