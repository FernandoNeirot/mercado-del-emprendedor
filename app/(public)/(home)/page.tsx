import { Header } from "@/features/header/Header";
import { PromotionsSection } from "@/features/promotions/PromotionsSection";
import { FeaturedVendor } from "@/features/featured-vendor/FeaturedVendor";
import { FeaturedProducts } from "@/features/featured-products/FeaturedProducts";
import { VendorsSection } from "@/features/vendors/VendorsSection";
import { EntrepreneurCTA } from "@/features/cta/EntrepreneurCTA";
import { Footer } from "@/features/footer/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <Header />
      <main className="max-w-310 px-4 sm:mx-auto">
        <PromotionsSection />
        <FeaturedVendor />
        <FeaturedProducts />
        <VendorsSection />
        <EntrepreneurCTA />
      </main>
      <Footer />
    </div>
  );
}
