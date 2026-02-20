"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/shared/components/Icon";
import type { StoreProduct } from "@/features/tienda";
import type { StoreVendor } from "@/features/tienda";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

interface StoreEditorTabCatalogoProps {
  vendor: StoreVendor | null;
  products: StoreProduct[];
}

export function StoreEditorTabCatalogo({ vendor, products }: StoreEditorTabCatalogoProps) {
  if (!vendor?.id) {
    return (
      <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Catálogo de productos
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Guardá la tienda primero para poder agregar productos.
        </p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Catálogo de productos
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Aún no hay productos. Podés agregar productos desde aquí (próximamente).
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Catálogo de productos
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((p) => {
          const imageUrl = (p.images?.[0] ?? p.imageUrl) || "";
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                {imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={imageUrl}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                    <Icon name="image" className="text-4xl text-slate-400" />
                  </div>
                )}
                <Link
                  href={`/dashboard/tienda/${vendor.slug}/producto/${p.slug}`}
                  className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/90 hover:bg-primary text-white font-semibold text-sm transition-colors"
                >
                  <Icon name="edit" className="text-base" />
                  Editar
                </Link>
              </div>
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 truncate">
                  {p.name}
                </h3>
                <p className="mt-1 md:mt-2 font-bold text-primary dark:text-emerald-400 text-sm md:text-base">
                  {formatPrice(p.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
