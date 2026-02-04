"use client";

import React, { useState } from "react";
import { ProductCard, type Product } from "@/features/featured-products";
import type { StoreProduct } from "../types";
import type { StoreVendor } from "../types";

interface StoreCatalogProps {
  vendor: StoreVendor;
  products: StoreProduct[];
}

const productFilters = [
  { id: "todos", label: "Todos los productos" },
  { id: "temporada", label: "Temporada" },
];

function storeProductToProduct(
  storeProduct: StoreProduct,
  vendorName: string
): Product {
  return {
    id: storeProduct.id,
    name: storeProduct.name,
    vendor: vendorName,
    imageUrl: storeProduct.imageUrl,
  };
}

export function StoreCatalog({ vendor, products }: StoreCatalogProps) {
  console.log(products);
  const [activeFilter, setActiveFilter] = useState("todos");

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl">
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
        {productFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === filter.id
                ? "bg-primary dark:bg-emerald-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={storeProductToProduct(product, vendor.name)}
            price={product.price}
            href={`/tienda/${vendor.id}/producto/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
}
