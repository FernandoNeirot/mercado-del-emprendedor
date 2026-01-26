import { Header } from "@/features/header/Header";
import { PromotionsSection } from "@/features/promotions/PromotionsSection";
import { VendorsSection } from "@/features/vendors/VendorsSection";
import { EntrepreneurCTA } from "@/features/cta/EntrepreneurCTA";
import { Footer } from "@/features/footer/Footer";
import { CategoryFilter } from "@/features/header/components/CategoryFilter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col md:max-w-[1240px] mx-auto bg-soft-bg dark:bg-background-dark overflow-x-hidden shadow-2xl md:shadow-none pb-24 md:pb-0">
      <Header />
      <main className="flex-1 w-full md:max-w-310 md:mx-auto md:px-4 md:px-6 lg:px-8 md:py-8">
        {/* Category Filter for Desktop */}
        <div className="hidden md:block mb-8">
          <CategoryFilter
            categories={[
              { id: "all", name: "Todos" },
              { id: "indumentaria", name: "Indumentaria" },
              { id: "pasteleria", name: "Pastelería" },
              { id: "costureria", name: "Costura" },
              { id: "artesanias", name: "Artesanías" },
              { id: "mascotas", name: "Mascotas" },
              { id: "hogar", name: "Hogar" },
            ]}
            selectedCategory="all"
          />
        </div>
        <PromotionsSection />
        <VendorsSection />
        <EntrepreneurCTA />
      </main>
      <Footer />
    </div>
  );
}
