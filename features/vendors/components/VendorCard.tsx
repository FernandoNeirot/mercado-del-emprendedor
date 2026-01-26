"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

export interface Vendor {
  id: string;
  name: string;
  location: string;
  category: string;
  imageUrl: string;
}

interface VendorCardProps {
  vendor: Vendor;
  onContact?: (vendorId: string) => void;
}

export function VendorCard({ vendor, onContact }: VendorCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[24px] md:rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm md:hover:shadow-md transition-shadow flex flex-col group">
      <div className="aspect-[4/5] md:h-64 relative">
        <img
          alt={vendor.name}
          className="w-full h-full object-cover"
          src={vendor.imageUrl}
        />
        <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full md:rounded-lg">
          <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-wider">
            {vendor.category}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <h4 className="font-bold text-sm md:text-xl text-slate-900 dark:text-slate-100 leading-tight mb-1">
          {vendor.name}
        </h4>
        <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mt-1 md:mt-0 mb-4 flex items-center gap-1">
          <Icon name="location_on" className="text-[12px] md:text-sm" />
          {vendor.location}
        </p>
        <button
          onClick={() => onContact?.(vendor.id)}
          className="mt-3 md:mt-0 w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 py-2 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-sm font-extrabold md:font-semibold flex items-center justify-center gap-1 md:gap-2 transition-colors"
        >
          <Icon name="chat_bubble_outline" className="text-sm" />
          Contactar
        </button>
      </div>
    </div>
  );
}
