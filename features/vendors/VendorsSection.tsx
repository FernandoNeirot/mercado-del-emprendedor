"use client";

import React from "react";
import { VendorCard, type Vendor } from "./components/VendorCard";

interface VendorsSectionProps {
  vendors?: Vendor[];
  totalCount?: number;
  onContact?: (vendorId: string) => void;
  onLoadMore?: () => void;
}

const defaultVendors: Vendor[] = [
  {
    id: "1",
    name: "Masa Madre & Arte",
    location: "Quilmes",
    category: "PASTELERÍA",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/panaderia.webp?alt=media&token=9bce9e33-457a-4177-82a5-ac0709c92832",
  },
  {
    id: "2",
    name: "Textiles del Sur",
    location: "Avellaneda",
    category: "TEXTILES",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/ropa.webp?alt=media&token=d6f729ce-6b95-4eb7-958c-457d64cb65cf",
  },
  {
    id: "3",
    name: "Eco Chic Boutique",
    location: "Bernal",
    category: "INDUMENTARIA",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/taller.webp?alt=media&token=2576fa08-53e6-4684-bf6d-76efdbe2628b",
  },
  {
    id: "4",
    name: "Taller Mara",
    location: "Avellaneda",
    category: "SERVICIOS",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/costura.webp?alt=media&token=a53701ff-6f22-475d-b049-d04e753a91cc",
  },
];

export function VendorsSection({
  vendors = defaultVendors,
  totalCount = 348,
  onContact,
  onLoadMore,
}: VendorsSectionProps) {
  return (
    <section className="px-5 md:px-0 mb-16">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-lg md:text-2xl font-extrabold md:font-bold text-slate-800 dark:text-slate-100">
          Descubrí Talentos
        </h2>
        <span className="text-[11px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">
          {totalCount} DISPONIBLES
        </span>
      </div>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[770px]:grid-cols-3 min-[1000px]:grid-cols-4 gap-4 md:gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onContact={onContact} />
        ))}
      </div>
      <div className="mt-8 md:mt-12 flex justify-center">
        <button
          onClick={onLoadMore}
          className="px-8 md:px-10 py-3 md:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full md:rounded-2xl text-xs md:text-sm font-black md:font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary transition-all shadow-sm"
        >
          Ver más emprendedores
        </button>
      </div>
    </section>
  );
}
