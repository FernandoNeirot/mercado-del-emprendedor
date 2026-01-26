import React from "react";
import { Icon } from "@/shared/components/Icon";

export function Logo() {
  return (
    <div className="flex items-center gap-2 md:gap-3 shrink-0">
      <div className="size-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
        <Icon name="storefront" className="text-white text-xl md:text-base" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs md:text-xl font-black tracking-tighter md:leading-none uppercase leading-none text-primary dark:text-emerald-400">
          Mercado del
        </span>
        <span className="text-sm md:text-lg font-black tracking-tight md:tracking-tight uppercase leading-none">
          Emprendedor
        </span>
      </div>
    </div>
  );
}
