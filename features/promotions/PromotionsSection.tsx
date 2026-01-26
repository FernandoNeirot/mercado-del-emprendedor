import React from "react";
import { PromotionCard } from "./components/PromotionCard";

interface Promotion {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  bgColor: "primary" | "accent-green";
}

interface PromotionsSectionProps {
  promotions?: Promotion[];
}

const defaultPromotions: Promotion[] = [
  {
    id: "1",
    title: "20% OFF en Regalos",
    description: "Aplica a todo Artesanías",
    buttonText: "Ver más",
    icon: "featured_seasonal_and_gifts",
    bgColor: "primary",
  },
  {
    id: "2",
    title: "Envío Gratis Hoy",
    description: "En zona Quilmes y Bernal",
    buttonText: "Aprovechar",
    icon: "local_shipping",
    bgColor: "accent-green",
  },
];

export function PromotionsSection({
  promotions = defaultPromotions,
}: PromotionsSectionProps) {
  return (
    <section className="mb-12 md:mb-12 py-6 md:py-8 overflow-hidden">
      <div className="px-5 md:px-0 mb-4 md:mb-6 flex items-center justify-between">
        <h2 className="text-sm md:text-sm font-black md:font-bold uppercase tracking-widest md:tracking-[0.15em] text-slate-400">
          Promociones Flash
        </h2>
        <div className="flex gap-1 md:gap-2">
          <div className="size-1 md:w-2 md:h-2 rounded-full bg-primary"></div>
          <div className="size-1 md:w-2 md:h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          <div className="size-1 md:w-2 md:h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
      <div className="flex md:grid md:grid-cols-2 overflow-x-auto no-scrollbar gap-4 md:gap-6 px-5 md:px-0">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </section>
  );
}
