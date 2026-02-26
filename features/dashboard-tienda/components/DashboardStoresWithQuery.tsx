"use client";

import React from "react";
import { DashboardStoreList } from "./DashboardStoreList";
import { useMyStores } from "@/lib/hooks/useMyStores";

/**
 * Carga la lista de tiendas con la server action getStores vía React Query.
 */
export function DashboardStoresWithQuery() {
  const { data, isLoading, error, isFetching } = useMyStores();
  const stores = data ?? [];

  if (error) {
    const message = error instanceof Error ? error.message : "Error al cargar tiendas";
    const isUnauth = message.includes("No autorizado") || message.toLowerCase().includes("autorizado");
    return (
      <div className="text-center py-8 space-y-2">
        <p className="text-red-500 dark:text-red-400 text-sm">{message}</p>
        {isUnauth && (
          <p className="text-slate-500 dark:text-slate-400 text-xs max-w-sm mx-auto">
            Si entraste desde otro sitio (ej. localhost), iniciá sesión de nuevo en esta página para ver tus tiendas.
          </p>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
        Cargando tiendas…
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {isFetching && (
        <p className="text-xs text-slate-400 dark:text-slate-500" aria-hidden>
          Actualizando…
        </p>
      )}
      <DashboardStoreList stores={stores} />
    </div>
  );
}
