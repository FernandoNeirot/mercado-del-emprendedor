"use client";

import React from "react";

export type StoreTab = "catalogo" | "historia" | "reseñas";

interface StoreTabsProps {
  activeTab: StoreTab;
  onTabChange: (tab: StoreTab) => void;
}

const tabs: { id: StoreTab; label: string }[] = [
  { id: "catalogo", label: "Catálogo" },
  { id: "historia", label: "Mi Historia" },
  { id: "reseñas", label: "Reseñas" },
];

export function StoreTabs({ activeTab, onTabChange }: StoreTabsProps) {
  return (
    <nav
      className="sticky top-0 z-30 flex bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 rounded-b-xl md:rounded-b-2xl overflow-hidden"
      aria-label="Secciones de la tienda"
    >
      <div className="flex w-full md:max-w-md md:mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3.5 md:py-4 text-sm md:text-base font-semibold transition-colors ${
              activeTab === tab.id
                ? "text-slate-900 dark:text-white border-b-2 border-primary dark:border-emerald-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
