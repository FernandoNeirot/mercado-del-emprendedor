import { PromotionsSection } from "@/features/promotions/PromotionsSection";
import { FeaturedVendor } from "@/features/featured-vendor/FeaturedVendor";
import { FeaturedProducts } from "@/features/featured-products/FeaturedProducts";
import { VendorsSection } from "@/features/vendors/VendorsSection";
import { EntrepreneurCTA } from "@/features/cta/EntrepreneurCTA";
import type { Metadata } from "next";
import { canonicalUrl, SITE_NAME, SITE_DESCRIPTION } from "@/shared/configs/seo";
import { getAllStores } from "@/lib/server-actions";
import type { StoreVendor } from "@/features/tienda";
import type { VendorLarge } from "@/features/vendors/components/VendorCardLarge";

function storeToVendorLarge(store: StoreVendor): VendorLarge {
  const imageUrl = (store.logoUrl || store.bannerUrl || "").trim();
  return {
    id: store.slug || store.id,
    name: store.name,
    category: store.category || "Emprendimiento",
    description: store.tagline || "",
    rating: 0,
    imageUrl: imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3C/svg%3E",
  };
}

export const metadata: Metadata = {
  title: "Inicio",
  description: SITE_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    url: canonicalUrl("/"),
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default async function Home() {
  const stores = await getAllStores();
  const vendors: VendorLarge[] = stores.map(storeToVendorLarge);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <main className="max-w-310 px-4 sm:mx-auto">
        <PromotionsSection />
        <FeaturedVendor />
        <FeaturedProducts />
        <VendorsSection vendors={vendors} totalCount={vendors.length} />
        <EntrepreneurCTA />
      </main>
    </div>
  );
}
