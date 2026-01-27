"use client";

import React from "react";
import { ProductCard, type Product } from "./components/ProductCard";

interface FeaturedProductsProps {
  products?: Product[];
  onView?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Torta de Frutos Rojos",
    vendor: "Bakery Shop",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/taller.webp?alt=media&token=2576fa08-53e6-4684-bf6d-76efdbe2628b",
  },
  {
    id: "2",
    name: "Bolso de Cuero Handmade",
    vendor: "Artesanías Luz",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/ropa.webp?alt=media&token=d6f729ce-6b95-4eb7-958c-457d64cb65cf",
  },
  {
    id: "3",
    name: "Manta Nórdica XXL",
    vendor: "Textiles Sur",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/panaderia.webp?alt=media&token=9bce9e33-457a-4177-82a5-ac0709c92832",
  },
  {
    id: "4",
    name: "Set de Tazas Orgánicas",
    vendor: "Taller Mara",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mercado-del-emprendedor.firebasestorage.app/o/costura.webp?alt=media&token=a53701ff-6f22-475d-b049-d04e753a91cc",
  },
];

export function FeaturedProducts({
  products = defaultProducts,
  onView,
  onFavorite,
}: FeaturedProductsProps) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row mt-8 items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Productos Destacados</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
            Seleccionados por su calidad y originalidad
          </p>
        </div>
        <button className="text-primary dark:text-secondary font-bold text-xs md:text-sm hover:underline uppercase tracking-wider whitespace-nowrap">
          Ver todos
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={onView}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </section>
  );
}
