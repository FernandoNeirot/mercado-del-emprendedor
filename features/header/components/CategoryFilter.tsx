"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <nav className="md:px-0 md:py-0 px-5 pb-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 md:gap-3 w-max md:w-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange?.(category.id)}
            className={cn(
              "px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold md:font-medium transition-colors whitespace-nowrap",
              selectedCategory === category.id
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-primary"
            )}
          >
            {category.name}
          </button>
        ))}
        <button className="md:hidden px-2 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 flex items-center justify-center">
          <Icon name="add" className="text-lg" />
        </button>
      </div>
    </nav>
  );
}
