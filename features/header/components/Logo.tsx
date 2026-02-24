"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Logo() {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  const content = (
    <>
      <div className="relative w-10 h-9 md:w-12 md:h-12 bg-primary rounded-md flex items-center justify-center text-white shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo_1.webp"
          alt="Mercado Emprendedor"
          className="object-cover"
          width={48}
          height={48}
        />
      </div>
      <div className="block">
        <h1 className="text-xs sm:text-sm font-bold leading-none text-primary dark:text-emerald-400 uppercase tracking-[0.55em]">
          Mercado
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
