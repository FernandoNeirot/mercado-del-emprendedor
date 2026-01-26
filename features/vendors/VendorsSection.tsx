"use client";

import React from "react";
import { VendorCardLarge, type VendorLarge } from "./components/VendorCardLarge";

interface VendorsSectionProps {
  vendors?: VendorLarge[];
  totalCount?: number;
  onVisit?: (vendorId: string) => void;
  onContact?: (vendorId: string) => void;
  onLoadMore?: () => void;
}

const defaultVendors: VendorLarge[] = [
  {
    id: "1",
    name: "Masa Madre & Arte",
    category: "Pastelería Artesanal",
    description:
      "Expertos en panificación con fermentación natural de 48hs. Conocé a Lucía y su pasión por lo hecho a mano.",
    rating: 4.9,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/costura.webp?alt=media&token=a53701ff-6f22-475d-b049-d04e753a91cc",
  },
  {
    id: "2",
    name: "Textiles del Sur",
    category: "Hogar & Textiles",
    description:
      "Confección de mantas y textiles utilizando técnicas ancestrales y materiales sustentables de origen local.",
    rating: 4.8,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/costura.webp?alt=media&token=a53701ff-6f22-475d-b049-d04e753a91cc",
  },
];

export function VendorsSection({
  vendors = defaultVendors,
  totalCount = 348,
  onVisit,
  onContact,
  onLoadMore,
}: VendorsSectionProps) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-2">
        <h2 className="text-xl md:text-2xl font-bold">Descubrí Talentos Locales</h2>
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
          {totalCount} EMPRENDEDORES ACTIVOS
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {vendors.map((vendor) => (
          <VendorCardLarge
            key={vendor.id}
            vendor={vendor}
            onVisit={onVisit}
            onContact={onContact}
          />
        ))}
      </div>
    </section>
  );
}
