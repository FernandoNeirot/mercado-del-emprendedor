"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import Link from "next/link";

interface StoreTopBarProps {
  storeId: string;
}

export function StoreTopBar({ storeId }: StoreTopBarProps) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/95 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <Link
        href="/"
        className="p-2 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Volver"
      >
        <Icon name="arrow_back" className="text-xl" />
      </Link>
      <button
        type="button"
        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Compartir"
      >
        <Icon name="share" className="text-xl" />
      </button>
    </div>
  );
}
