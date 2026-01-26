"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

export interface VendorLarge {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  imageUrl: string;
}

interface VendorCardLargeProps {
  vendor: VendorLarge;
  onVisit?: (vendorId: string) => void;
  onContact?: (vendorId: string) => void;
}

export function VendorCardLarge({
  vendor,
  onVisit,
  onContact,
}: VendorCardLargeProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-800 p-3">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="md:w-2/5 h-48 md:h-auto overflow-hidden rounded-xl md:rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={vendor.imageUrl}
          />
        </div>
        <div className="md:w-3/5 p-3 md:p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg md:text-2xl font-bold">{vendor.name}</h3>
              <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
                <Icon name="star" className="text-xs md:text-sm text-emerald-600" />
                <span className="text-xs md:text-sm font-bold text-emerald-600">
                  {vendor.rating}
                </span>
              </div>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-primary dark:text-emerald-400 mb-3 md:mb-4 block">
              {vendor.category}
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              {vendor.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <button
              onClick={() => onVisit?.(vendor.id)}
              className="w-full py-2.5 md:py-3.5 bg-primary text-white hover:bg-emerald-900 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 uppercase text-[10px] md:text-xs tracking-wider"
            >
              <Icon name="storefront" className="text-base md:text-lg" />
              <span className="hidden sm:inline">VISITAR TIENDA COMPLETA</span>
              <span className="sm:hidden">VISITAR TIENDA</span>
            </button>
            <button
              onClick={() => onContact?.(vendor.id)}
              className="w-full py-2 md:py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-100 dark:border-slate-700 uppercase text-[10px] md:text-xs tracking-wider"
            >
              <Icon name="chat" className="text-xs md:text-sm" />
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
