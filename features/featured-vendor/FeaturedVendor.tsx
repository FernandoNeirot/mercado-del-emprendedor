"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

interface FeaturedVendorProps {
  vendor?: {
    name: string;
    imageUrl: string;
    description: string;
  };
}

const defaultVendor = {
  name: "Masa Madre & Arte",
  imageUrl:
    "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/taller.webp?alt=media&token=2576fa08-53e6-4684-bf6d-76efdbe2628b",
  description:
    "Conocé la historia de Lucía y cómo transformó su pasión por el pan artesanal en el emprendimiento más querido de Quilmes. Calidad, tiempo y mucho amor en cada horneada.",
};

export function FeaturedVendor({ vendor = defaultVendor }: FeaturedVendorProps) {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative bg-primary rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden flex flex-col xl:flex-row w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] shadow-2xl box-border">
        <div className="w-full xl:w-1/2 h-64 sm:h-72 md:h-80 xl:h-auto relative group flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={vendor.name}
            className="w-full h-full object-cover"
            src={vendor.imageUrl}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40">
              <Icon name="play_arrow" className="text-4xl md:text-5xl" filled />
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 2xl:p-16 flex flex-col justify-center text-white flex-shrink-0 min-w-0 box-border">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6 w-full overflow-hidden">
            <span className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-secondary text-primary font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full uppercase tracking-widest break-words max-w-full">
              Emprendimiento de la Semana
            </span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight break-words overflow-wrap-anywhere">
            {vendor.name}: Una tradición familiar
          </h2>
          <p className="text-emerald-50 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 leading-relaxed break-words">
            {vendor.description}
          </p>
          <div className="flex flex-col gap-2 sm:gap-3 w-full">
            <button className="bg-white text-primary px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-base hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5 sm:gap-2 w-full box-border">
              <Icon name="visibility" className="text-base sm:text-lg md:text-xl flex-shrink-0" />
              <span className="hidden xl:inline">CONOCER MÁS SOBRE {vendor.name.toUpperCase()}</span>
              <span className="xl:hidden">CONOCER MÁS</span>
            </button>
            <button className="bg-primary/20 border-2 border-white/30 text-white px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-base hover:bg-white/10 transition-colors w-full box-border">
              VER CATÁLOGO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
