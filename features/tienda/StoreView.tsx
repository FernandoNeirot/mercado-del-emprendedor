"use client";

import React, { useState } from "react";
import { StoreHeader } from "./components/StoreHeader";
import { StoreTabs, type StoreTab } from "./components/StoreTabs";
import { StoreCatalog } from "./components/StoreCatalog";
import { StoreStory } from "./components/StoreStory";
import { StoreSocial } from "./components/StoreSocial";
import { StoreProcessGallery } from "./components/StoreProcessGallery";
import { StorePayments } from "./components/StorePayments";
import type { StoreVendor } from "./types";
import type { StoreProduct } from "./types";
import { Header } from "../header";

interface StoreViewProps {
  vendor: StoreVendor;
  products: StoreProduct[];
}

export function StoreView({ vendor, products }: StoreViewProps) {
  const [activeTab, setActiveTab] = useState<StoreTab>("catalogo");

  return (
    <>
      <Header hideLocation />
      <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20 md:pb-10">
        <div className="max-w-[1240px] mx-auto md:px-6 lg:px-8">
          <StoreHeader vendor={vendor} onContact={() => {}} />
          <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "catalogo" && (
            <StoreCatalog vendor={vendor} products={products} />
          )}

          {activeTab === "historia" && (
            <div className="space-y-0">
              <StoreStory vendor={vendor} />
              <StoreSocial vendor={vendor} />
              <StoreProcessGallery vendor={vendor} />
              <StorePayments vendor={vendor} />
            </div>
          )}

          {activeTab === "reseñas" && (
            <section className="p-4 md:p-8 py-12 text-center text-slate-500 dark:text-slate-400 text-sm md:text-base">
              Próximamente: reseñas de clientes
            </section>
          )}

          {activeTab === "catalogo" && (
            <div className="space-y-0 border-t border-slate-200 dark:border-slate-800">
              <StoreStory vendor={vendor} />
              <StoreSocial vendor={vendor} />
              <StoreProcessGallery vendor={vendor} />
              <StorePayments vendor={vendor} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
