"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Buscar productos o servicios...",
  onSearch,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative flex-1 flex items-center">
      <Icon
        name="search"
        className="absolute left-4 text-slate-400 text-xl md:text-base pointer-events-none"
      />
      <input
        type="text"
        className="w-full h-12 md:py-2.5 md:h-auto pl-11 pr-4 bg-white md:bg-slate-100 dark:bg-slate-800 border md:border-none border-slate-200 rounded-2xl md:rounded-full text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm md:shadow-none"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
