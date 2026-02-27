"use client";

import React from "react";
import { PromotionCard } from "./components/PromotionCard";
import { Icon } from "@/shared/components/Icon";

interface Promotion {
  id: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  bgColor: "amber" | "emerald" | "blue" | "purple";
}

interface PromotionsSectionProps {
  promotions?: Promotion[];
}

const defaultPromotions: Promotion[] = [
  {
    id: "1",
    badge: "Solo por hoy",
    title: "20% OFF en Cerámica",
    description: "En el catálogo de Taller Mara",
    buttonText: "VER AHORA",
    icon: "local_mall",
    bgColor: "amber",
  },
  {
    id: "2",
    badge: "Nuevo",
    title: "Kit de Masa Madre",
    description: "Lanzamiento exclusivo",
    buttonText: "DESCUBRIR",
    icon: "bakery_dining",
    bgColor: "emerald",
  },
  {
    id: "3",
    badge: "Envíos Gratis",
    title: "Textiles del Sur",
    description: "En toda la zona de Avellaneda",
    buttonText: "VER TIENDA",
    icon: "local_shipping",
    bgColor: "blue",
  },
  {
    id: "4",
    badge: "Especial",
    title: "Talleres de Bordado",
    description: "Cupos limitados para Junio",
    buttonText: "RESERVAR",
    icon: "stylus_laser_pointer",
    bgColor: "purple",
  },
];

export function PromotionsSection({
  promotions = defaultPromotions,
}: PromotionsSectionProps) {
  console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
  console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
  return (
    <section>
      <div className="flex items-center justify-between mb-3 mt-5 sm:mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
          <Icon name="bolt" className="text-amber-500 text-base sm:text-lg md:text-xl" />
          <span className="hidden sm:inline">Promociones Flash</span>
          <span className="sm:hidden">Promociones</span>
        </h2>
        {/* <div className="hidden md:flex gap-2">
          <button className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Icon name="chevron_left" className="text-sm" />
          </button>
          <button className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Icon name="chevron_right" className="text-sm" />
          </button>
        </div> */}
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </section>
  );
}
