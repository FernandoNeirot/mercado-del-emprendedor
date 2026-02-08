"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/shared/components/Icon";
import type { StoreTab } from "@/features/tienda/components/StoreTabs";
import type { StoreVendor, StoreProduct } from "@/features/tienda";
import { createStore, updateStore } from "@/lib/server-actions";
import { StoreEditorHeader } from "./components/StoreEditorHeader";
import { StoreEditorTabHistoria } from "./components/StoreEditorTabHistoria";
import { StoreEditorTabInformacion } from "./components/StoreEditorTabInformacion";
import { StoreEditorTabCatalogo } from "./components/StoreEditorTabCatalogo";
import { getDefaultStoreForm, type StoreFormState } from "./types";

interface StoreEditorViewProps {
  /** null = crear nueva tienda. */
  store: StoreVendor | null;
  products: StoreProduct[];
  /** Slug actual en la URL (para redirigir después de crear). */
  currentSlug: string;
}

function storeToFormState(store: StoreVendor | null): StoreFormState {
  if (!store) {
    const def = getDefaultStoreForm();
    return {
      ...def,
      name: def.name,
      slug: def.slug,
      tagline: def.tagline,
      stats: def.stats,
    };
  }
  return {
    ...store,
    name: store.name,
    slug: store.slug,
    tagline: store.tagline,
    stats: store.stats,
  };
}

export function StoreEditorView({ store, products, currentSlug }: StoreEditorViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<StoreTab>("catalogo");
  const [form, setForm] = useState<StoreFormState>(() => storeToFormState(store));

  const isCreating = !store?.id;

  const handleChange = (updates: Partial<StoreFormState>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (isCreating) {
          const defaults = getDefaultStoreForm();
          const payload = {
            ...defaults,
            ...form,
            name: form.name || defaults.name,
            slug: form.slug || defaults.slug,
            tagline: form.tagline || defaults.tagline,
            stats: form.stats ?? defaults.stats,
          };
          const created = await createStore({
            ...payload,
            createdAt: new Date(),
          });
          router.replace(`/dashboard/tienda/${created.slug}`);
          return;
        }
        const updated = await updateStore(currentSlug, form);
        if (updated.slug && updated.slug !== currentSlug) {
          router.replace(`/dashboard/tienda/${updated.slug}`);
        } else {
          router.refresh();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error al guardar";
        alert(message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20 md:pb-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
        >
          <Icon name="arrow_back" className="text-lg" />
          Volver al dashboard
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          <StoreEditorHeader
            form={form}
            onChange={handleChange}
            isCreating={isCreating}
          />

          <nav
            className="sticky top-[80px] z-30 flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-t-2xl overflow-hidden"
            aria-label="Secciones de la tienda"
          >
            <div className="flex w-full md:max-w-md md:mx-auto">
              {(
                [
                  { id: "catalogo" as const, label: "Catálogo" },
                  { id: "historia" as const, label: "Mi Historia" },
                  { id: "informacion" as const, label: "Información" },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 py-3.5 md:py-4 text-sm md:text-base font-semibold transition-colors ${
                    activeTab === id
                      ? "text-slate-900 dark:text-white border-b-2 border-primary dark:border-emerald-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {activeTab === "catalogo" && (
            <StoreEditorTabCatalogo vendor={store} products={products} />
          )}
          {activeTab === "historia" && (
            <StoreEditorTabHistoria form={form} onChange={handleChange} />
          )}
          {activeTab === "informacion" && (
            <StoreEditorTabInformacion form={form} onChange={handleChange} />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold disabled:opacity-50"
            >
              {isPending ? "Guardando…" : isCreating ? "Crear tienda" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
