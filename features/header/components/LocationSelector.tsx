"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

interface LocationSelectorProps {
  city?: string;
  neighborhood?: string;
}

export function LocationSelector({
  city = "Buenos Aires",
  neighborhood = "Avellaneda",
}: LocationSelectorProps) {
  return (
    <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
      <Icon name="location_on" className="text-primary" />
      <span className="uppercase text-slate-500 dark:text-slate-400 text-xs tracking-wider">
        {city}:
      </span>
      <span>{neighborhood}</span>
      <Icon name="expand_more" className="text-slate-400" />
    </button>
  );
}
