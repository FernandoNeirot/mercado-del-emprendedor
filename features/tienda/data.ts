import type { StoreVendor, StoreProduct } from "./types";

// Mock data - en producción vendría de API/DB
export async function getStoreById(id: string): Promise<StoreVendor | null> {
  const stores: Record<string, StoreVendor> = {
    "1": {
      id: "1",
      name: "Ropita Kids",
      bannerUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAu-mCavUUP7EsldU9ju-IDMj9oYvzv6NJ8XNcgsh9miM0AJFyT0yY-j7WkfVILrl6DP8nscbFaQmWSKtiYLzhysXv8noyBxneHONZ8I6-hnS9wdJK9QuOTYpYf7AAbveNIsi81aXXGtnVWOrxLeliQEhgVpdVdGpXEsPevExGeYmxHy3WNTgaST_XWR-_SNEKfvIJWACSaDAcl4u0KX9zwTxbaBfTntIB1zdwsah70N5Uyx5nZFUUSyE9JIWNNuwakcPpKLmFTp6YJ",
      tagline: "Moda circular para los más peques con amor y cuidado",
      verified: true,
      stats: {
        sales: "120+",
        yearsInBusiness: "3 años",
        location: "Avellaneda",
      },
      deliveryDays: ["Lun", "Mié", "Vie", "Sáb"],
      story: {
        founderName: "Marina, Fundadora",
        paragraphs: [
          "Ropita Kids nació en mi living hace 3 años, cuando buscaba ropa duradera y con alma para mi primer hijo. Me di cuenta de que muchas mamás buscaban lo mismo.",
          "Hoy cada pieza de mi catálogo pasa por mis manos. Reviso costuras, calidad de tela y diseño para que los más peques luzcan increíbles y cómodos. Mi propósito es crear moda consciente que trascienda temporadas.",
        ],
      },
      socialLinks: {
        instagram: "#",
        facebook: "#",
        tiktok: "#",
      },
      processGallery: [
        { type: "image", url: "#", thumbnailUrl: "https://picsum.photos/200/200?1" },
        { type: "image", url: "#", thumbnailUrl: "https://picsum.photos/200/200?2" },
        { type: "video", url: "#", thumbnailUrl: "https://picsum.photos/200/200?3" },
      ],
      paymentMethods: ["transferencia", "efectivo", "mercadopago"],
    },
  };
  return stores[id] ?? null;
}

export async function getStoreProducts(storeId: string): Promise<StoreProduct[]> {
  const productsByStore: Record<string, StoreProduct[]> = {
    "1": [
      {
        id: "p1",
        name: "Zapatillas Azules",
        price: 12500,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAu-mCavUUP7EsldU9ju-IDMj9oYvzv6NJ8XNcgsh9miM0AJFyT0yY-j7WkfVILrl6DP8nscbFaQmWSKtiYLzhysXv8noyBxneHONZ8I6-hnS9wdJK9QuOTYpYf7AAbveNIsi81aXXGtnVWOrxLeliQEhgVpdVdGpXEsPevExGeYmxHy3WNTgaST_XWR-_SNEKfvIJWACSaDAcl4u0KX9zwTxbaBfTntIB1zdwsah70N5Uyx5nZFUUSyE9JIWNNuwakcPpKLmFTp6YJ",
      },
      {
        id: "p2",
        name: "Vestido Floral",
        price: 8900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkcSPhFE_qjZfWMSCIaaz3xxtxzR--jgnYKZFrPhwV89zuHnCdevga4OOiti-3ye3dusDD67KX9wJWMc4yUwUFHmVQSRzrxxdJUdX92FN5uGyj9msKCNbhyu721XiHkq1_lPi_KsYtqAt2X6gAvH9Yss0V-URDMeHBI0JRAywcNMGtrIrqTupec_1wIBBs47ROo6DvVA__qHu-QfGRaa0QiUus3MlwrUMfCBbixjgMjSwQV8R7AOlemMiiU6IqyqhJvknsOMjf9Lh",
      },
      {
        id: "p3",
        name: "Remera Rayada",
        price: 4500,
        imageUrl: "https://picsum.photos/400/400?4",
      },
      {
        id: "p4",
        name: "Pantalón Jean",
        price: 9900,
        imageUrl: "https://picsum.photos/400/400?5",
      },
    ],
  };
  return productsByStore[storeId] ?? [];
}
