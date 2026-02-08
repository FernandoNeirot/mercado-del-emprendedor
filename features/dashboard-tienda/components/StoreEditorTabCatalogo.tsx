"use client";

import React from "react";
import type { StoreProduct } from "@/features/tienda";
import type { StoreVendor } from "@/features/tienda";

interface StoreEditorTabCatalogoProps {
  vendor: StoreVendor | null;
  products: StoreProduct[];
}

export function StoreEditorTabCatalogo({ vendor, products }: StoreEditorTabCatalogoProps) {
  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Catálogo de productos
      </h2>
      {!vendor?.id ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Guardá la tienda primero para poder agregar productos.
        </p>
      ) : products.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Aún no hay productos. Podés agregar productos desde aquí (próximamente).
        </p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
            >
              <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                ${p.price}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
