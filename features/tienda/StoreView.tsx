"use client";

import React, { useState } from "react";
import { StoreHeader } from "./components/StoreHeader";
import { StoreTabs, type StoreTab } from "./components/StoreTabs";
import { StoreCatalog } from "./components/StoreCatalog";
import { StoreStory } from "./components/StoreStory";
import { StoreSocial } from "./components/StoreSocial";
import { StorePayments } from "./components/StorePayments";
import type { StoreVendor } from "./types";
import type { StoreProduct } from "./types";
import { StoreAvailable } from "./components/StoreAvailable";
import { StorePersonalInfo } from "./components/StorePersonalInfo";

interface StoreViewProps {
  vendor: StoreVendor;
  products: StoreProduct[];
}

export function StoreView({ vendor, products }: StoreViewProps) {
  const [activeTab, setActiveTab] = useState<StoreTab>("catalogo");

  return (
    <>
      <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20 md:pb-10">
        <div className="max-w-[1240px] mx-auto md:px-6 lg:px-8">
          <StoreHeader vendor={vendor} onContact={() => {}} />
          <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "catalogo" && (
            <StoreCatalog vendor={vendor} products={products} />
          )}

          {activeTab === "historia" && (
            <div className="space-y-0">
              <StoreStory vendor={vendor} isStoreTab={true}      />       
            </div>
          )}

          {activeTab === "informacion" && (
            <div className="space-y-0">
              <StoreAvailable vendor={vendor} />
              <StorePayments vendor={vendor} />
              <StorePersonalInfo vendor={vendor} />
              <StoreSocial vendor={vendor} />
            </div>
          )}

          {activeTab === "catalogo" && (
            <div className="space-y-0 border-t border-slate-200 dark:border-slate-800">
              <StoreStory vendor={vendor} />
              <StoreAvailable vendor={vendor} />
              <StorePayments vendor={vendor} />
              <StorePersonalInfo vendor={vendor} />
              <StoreSocial vendor={vendor} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
