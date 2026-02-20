"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StoreHeaderProps {
  vendor: StoreVendor;
  onContact?: () => void;
}

export function StoreHeader({ vendor, onContact }: StoreHeaderProps) {
  const hasBanner = Boolean(vendor?.bannerUrl);

  return (
    <header className="relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 md:h-56 lg:h-64">
        {hasBanner ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vendor.bannerUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900" />
        )}
      </div>

      {/* Barra superior */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-slate-900/85 via-slate-900/40 to-transparent">
        <div className="flex items-center justify-end px-4 md:px-6 py-3 max-w-[1240px] mx-auto">
          <button
            type="button"
            aria-label="Compartir"
          >
            <Icon name="share" className="text-xl p-2 rounded-full bg-white/40 hover:bg-white/30 text-white backdrop-blur-sm transition-colors" />
          </button>
        </div>
      </div>

      {/* Logo en tarjeta blanca superpuesta al banner */}
      <div className="relative z-20 flex justify-center pt-24 md:pt-28 lg:pt-32 pb-0">
        <div className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl p-2 md:p-2.5 shadow-xl border border-slate-100 dark:border-slate-700 -mb-8 md:-mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vendor?.logoUrl ?? ""}
            alt={vendor.name}
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Contenido: nombre, tagline, estadísticas, botón */}
      <div className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl pt-10 md:pt-12 pb-6 md:pb-8 px-4 md:px-8 text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2 flex-wrap">
          {vendor.name}
          {vendor.verified && (
            <span
              className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary dark:bg-emerald-500 text-white shrink-0"
              aria-label="Verificado"
            >
              <Icon name="check" className="text-sm md:text-base" />
            </span>
          )}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-1.5 flex items-center justify-center gap-1.5 flex-wrap max-w-xl mx-auto">
          {vendor.tagline}
          <span className="text-primary dark:text-emerald-400" aria-hidden>
            <Icon name="recycling" className="text-base" />
          </span>
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8 max-w-md mx-auto">
          {
            vendor.stats.clients && (
              <div className="text-center">
                <p className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
                  {vendor.stats.clients}
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Clientes
                </p>
              </div>
            )
          }
          {
            vendor.stats.sales && (
              <div className="text-center">
                <p className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
                  {vendor.stats.sales}
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Ventas
                </p>
              </div>
            )
          }

          {
            vendor.stats.yearsInBusiness && (
              <div className="text-center">
                <p className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
                  {vendor.stats.yearsInBusiness}
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  En el rubro
                </p>
              </div>
            )
          }

          {
            vendor.stats.location && (
              <div className="text-center">
                <p className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
                  {vendor.stats.location}
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Ubicación
                </p>
              </div>
            )
          }

        </div>

        <button
          type="button"
          onClick={onContact}
          className="mt-6 md:mt-8 w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-3.5 md:py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg rounded-2xl shadow-lg shadow-primary/25 transition-colors"
        >
          <Icon name="chat" className="text-lg md:text-xl" />
          Contactar
        </button>
      </div>
    </header>
  );
}
