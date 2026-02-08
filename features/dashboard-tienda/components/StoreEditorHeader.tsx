"use client";

import React from "react";
import type { StoreFormState } from "../types";

interface StoreEditorHeaderProps {
  form: StoreFormState;
  onChange: (updates: Partial<StoreFormState>) => void;
  isCreating: boolean;
}

export function StoreEditorHeader({ form, onChange, isCreating }: StoreEditorHeaderProps) {
  return (
    <header className="relative bg-slate-100 dark:bg-slate-900 overflow-hidden rounded-t-2xl border border-slate-200 dark:border-slate-700">
      <div className="p-4 md:p-6 lg:p-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {isCreating ? "Nueva tienda" : "Datos de la tienda"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Nombre
            </span>
            <input
              type="text"
              value={form.name ?? ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="Ej. Feni Indumentaria"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Slug (URL)
            </span>
            <input
              type="text"
              value={form.slug ?? ""}
              onChange={(e) =>
                onChange({
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="feni-indumentaria-infantil"
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Tagline
          </span>
          <input
            type="text"
            value={form.tagline ?? ""}
            onChange={(e) => onChange({ tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
            placeholder="Moda infantil sustentable"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["location", "clients", "sales", "yearsInBusiness"] as const).map((key) => (
            <label key={key} className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                {key === "location" && "Ubicación"}
                {key === "clients" && "Clientes"}
                {key === "sales" && "Ventas"}
                {key === "yearsInBusiness" && "Años en el rubro"}
              </span>
              <input
                type="text"
                value={form.stats?.[key] ?? ""}
                onChange={(e) =>
                  onChange({
                    stats: { ...form.stats, [key]: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Logo (URL)
            </span>
            <input
              type="url"
              value={form.logoUrl ?? ""}
              onChange={(e) => onChange({ logoUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="https://..."
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Banner (URL)
            </span>
            <input
              type="url"
              value={form.bannerUrl ?? ""}
              onChange={(e) => onChange({ bannerUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="https://..."
            />
          </label>
        </div>
      </div>
    </header>
  );
}
