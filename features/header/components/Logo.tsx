"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/shared/components/Icon";

export function Logo() {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  const content = (
    <>
      <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
        <Icon name="storefront" className="text-lg md:text-base" />
      </div>
      <div className="block">
        <h1 className="text-xs sm:text-sm font-bold leading-none text-primary dark:text-emerald-400 uppercase tracking-tighter">
          Mercado del
        </h1>
        <p className="text-sm sm:text-base font-black tracking-tight leading-none uppercase">
          Emprendedor
        </p>
      </div>
    </>
  );

  if (isRoot) {
    return (
      <div className="flex items-center gap-2 md:gap-3 shrink-0" aria-hidden>
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/"
      className="flex items-center gap-2 md:gap-3 shrink-0 hover:opacity-90 transition-opacity"
      aria-label="Ir al inicio"
    >
      {content}
    </Link>
  );
}
