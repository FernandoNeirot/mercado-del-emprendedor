"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/shared/components/Icon";
import { useRouter } from "next/navigation";
import type { StoreProduct } from "../types";
import type { StoreVendor } from "../types";

const MAX_IMAGES = 3;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

function getProductImages(product: StoreProduct): string[] {
  const fromArray = (product.images ?? []).slice(0, MAX_IMAGES);
  if (fromArray.length > 0) return fromArray;
  if (product.imageUrl) return [product.imageUrl];
  return [];
}

interface ProductViewProps {
  product: StoreProduct;
  vendor: StoreVendor;
}

export function ProductView({ product, vendor }: ProductViewProps) {
  const images = getProductImages(product);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex] ?? images[0];

  const handleContact = () => {
    const whatsappMessage = `Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(product.name)}.%0A${encodeURIComponent(product.slug)}`;
    const linkSeller = `https://wa.me/${vendor?.personalInfo?.phone}?text=${whatsappMessage}`;
    window.open(linkSeller, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/50 pb-10 md:pb-16">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4 md:mb-6">
          <Link
            href="/"
            className="hover:text-primary dark:hover:text-emerald-400 transition-colors"
          >
            Inicio
          </Link>
          <Icon name="chevron_right" className="text-base" />
          <Link
            href={`/tienda/${vendor.slug}`}
            className="hover:text-primary dark:hover:text-emerald-400 transition-colors truncate"
          >
            {vendor.name}
          </Link>
          <Icon name="chevron_right" className="text-base shrink-0" />
          <span className="text-slate-700 dark:text-slate-200 truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Galería (máx. 3 fotos) */}
          <section className="space-y-3">
            <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              {mainImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Icon name="image" className="text-6xl" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-colors shrink-0 ${selectedIndex === i
                      ? "border-primary dark:border-emerald-500 ring-2 ring-primary/20"
                      : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Info del producto */}
          <section className="flex flex-col lg:min-h-0">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-2 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-primary dark:text-emerald-400">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice != null &&
                product.compareAtPrice > product.price && (
                  <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
            </div>

            {(product.description || product.richDescription) && (
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-6">
                {product.richDescription ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.richDescription,
                    }}
                    className="product-description text-sm md:text-base leading-relaxed"
                  />
                ) : (
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                )}
              </div>
            )}

            {
              vendor.personalInfo?.phone &&
              <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleContact}
                  className="w-full flex items-center justify-center gap-2 py-4 md:py-5 bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg rounded-2xl shadow-lg shadow-primary/25 transition-colors"
                >
                  <Icon name="chat" className="text-xl" />
                  Consultar al vendedor
                </button>
              </div>
            }
          </section>
        </div>
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2">
          {product.specs && product.specs.length > 0 && (
            <dl className="grid gap-2 mb-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <dt className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                    {spec.label}:
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-200">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {/* Card del vendedor */}
        <section className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Vendedor
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vendor.logoUrl ?? ""}
                alt={vendor.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-slate-100 dark:border-slate-600"
              />
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  {vendor.name}
                  {vendor.verified && (
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary dark:bg-emerald-500 text-white"
                      aria-label="Verificado"
                    >
                      <Icon name="check" className="text-xs" />
                    </span>
                  )}
                </h2>
                {vendor.tagline && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {vendor.tagline}
                  </p>
                )}
              </div>
            </div>
            <Link
              href={`/tienda/${vendor.id}`}
              className="sm:ml-auto w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors"
            >
              Ver más de este vendedor
              <Icon name="arrow_forward" className="text-lg" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
