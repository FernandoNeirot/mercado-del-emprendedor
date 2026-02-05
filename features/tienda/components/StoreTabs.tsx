"use client";

import React from "react";

export type StoreTab = "catalogo" | "historia" | "informacion";

interface StoreTabsProps {
  activeTab: StoreTab;
  onTabChange: (tab: StoreTab) => void;
}

const tabs: { id: StoreTab; label: string }[] = [
  { id: "catalogo", label: "Catálogo" },
  { id: "historia", label: "Mi Historia" },
  { id: "informacion", label: "Información" },
];

export function StoreTabs({ activeTab, onTabChange }: StoreTabsProps) {
  return (
    <nav
      className="sticky top-[80px] z-30 flex bg-white dark:bg-slate-900 border-b border-green-900 dark:border-green-900  overflow-hidden"
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
