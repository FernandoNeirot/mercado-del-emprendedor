"use client";

import React from "react";
import Link from "next/link";
import type { StoreProduct } from "../types";

interface StoreProductCardProps {
  product: StoreProduct;
  storeId: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function StoreProductCard({ product }: StoreProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group flex flex-col hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.imageUrl}
        />
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 truncate">
          {product.name}
        </h3>
        <p className="mt-1 md:mt-2 font-bold text-primary dark:text-emerald-400 text-sm md:text-base">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
