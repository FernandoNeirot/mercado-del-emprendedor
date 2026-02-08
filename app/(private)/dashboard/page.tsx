import { getStores } from "@/lib/server-actions";
import { DashboardStoreList } from "@/features/dashboard-tienda";
import type { Metadata } from "next";

/** Evita prerender en build: getStores() hace fetch a la API y no hay servidor en build. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Mis tiendas",
  description: "Gestioná tus tiendas",
};

export default async function DashboardPage() {
  const stores = await getStores();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Mis tiendas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Seleccioná una tienda para editarla o creá una nueva.
        </p>
        <DashboardStoreList stores={stores} />
      </div>
    </div>
  );
}
