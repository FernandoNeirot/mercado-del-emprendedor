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
    <div className="relative flex-1 flex items-center w-full">
      <div className="relative w-full flex items-center justify-center gap-2">
        <Icon
          name="search"
          className="absolute inset-y-0 mt-2 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-lg"
        />
        <input
          type="text"
          className="block w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
