"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "@/features/tienda";

interface DashboardStoreListProps {
  stores: StoreVendor[];
}

export function DashboardStoreList({ stores }: DashboardStoreListProps) {
  return (
    <div className="space-y-4">
      {
        stores.length < 2 &&
        <Link
          href="/dashboard/tienda/nueva"
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-emerald-500 hover:bg-primary/5 dark:hover:bg-emerald-500/5 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-emerald-400 font-semibold transition-colors"
        >
          <Icon name="add" className="text-xl" />
          Nueva tienda
        </Link>
      }

      {stores.length === 0 ? (
        <p className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
          Aún no tenés tiendas. Creá una con el botón de arriba.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <li key={store.id}>
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-emerald-500/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                    {store.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={store.logoUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Icon name="store" className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {store.name}
                    </p>
                    {store.tagline && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {store.tagline}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Link
                    href={`/dashboard/tienda/${store.slug}`}
                    className="px-3 py-1.5 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/tienda/${store.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-bold rounded-full border border-primary dark:border-emerald-500 text-primary dark:text-emerald-400 hover:bg-primary/10 dark:hover:bg-emerald-500/10 transition-colors"
                  >
                    Ver tienda
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
