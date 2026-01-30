"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StoreProcessGalleryProps {
  vendor: StoreVendor;
}

export function StoreProcessGallery({ vendor }: StoreProcessGalleryProps) {
  const gallery = vendor.processGallery;
  if (!gallery?.length) return null;

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Galería de proceso
        </h2>
        <button
          type="button"
          className="text-sm md:text-base font-semibold text-primary dark:text-emerald-400 hover:underline"
        >
          Detrás de escena
        </button>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
        {gallery.map((item, i) => (
          <div
            key={i}
            className="relative shrink-0 w-32 h-32 md:w-full md:aspect-square md:max-w-xs md:mx-auto rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Icon name="play_arrow" className="text-primary text-2xl md:text-3xl" filled />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
