"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

export interface Product {
  id: string;
  name: string;
  vendor: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onView?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
}

export function ProductCard({ product, onView, onFavorite }: ProductCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-40 md:h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={product.imageUrl}
        />
        <button
          onClick={() => onFavorite?.(product.id)}
          className="absolute top-2 right-2 md:top-3 md:right-3 "
        >
          <Icon
            name="favorite"
            className="text-base md:text-[20px] bg-white/90 backdrop-blur p-1.5 md:p-2 rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors"
          />
        </button>
      </div>
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {product.vendor}
        </p>
        <h4 className="font-bold text-sm md:text-lg mb-3 md:mb-4 truncate text-slate-800 dark:text-slate-100">
          {product.name}
        </h4>
        <div className="mt-auto">
          <button
            onClick={() => onView?.(product.id)}
            className="w-full py-2 md:py-2.5 bg-slate-200 shadow-sm dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-100 dark:border-slate-700 uppercase text-[10px] md:text-xs tracking-wider"
          >
            <Icon name="visibility" className="text-xs md:text-sm" />
            VER MÁS DETALLES
          </button>
        </div>
      </div>
    </div>
  );
}
