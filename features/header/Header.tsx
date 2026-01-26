"use client";

import React from "react";
import { Logo } from "./components/Logo";
import { LocationSelector } from "./components/LocationSelector";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { Icon } from "@/shared/components/Icon";

interface Category {
  id: string;
  name: string;
}

interface HeaderProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onSearch?: (value: string) => void;
}

const defaultCategories: Category[] = [
  { id: "all", name: "Todos" },
  { id: "indumentaria", name: "Indumentaria" },
  { id: "pasteleria", name: "Pastelería" },
  { id: "costureria", name: "Costura" },
  { id: "artesanias", name: "Artesanías" },
  { id: "mascotas", name: "Mascotas" },
  { id: "hogar", name: "Hogar" },
];

export function Header({
  categories = defaultCategories,
  selectedCategory = "all",
  onCategoryChange,
  onSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1">
            <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
              <Icon name="menu" className="text-slate-700" />
            </button>
          </div>
        </div>
        <div className="px-5 pb-3">
          <LocationSelector />
        </div>
        <div className="px-5 pb-4">
          <SearchBar onSearch={onSearch} />
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          <Logo />
          <div className="flex-1 flex items-center gap-4 max-w-3xl">
            <LocationSelector />
            <SearchBar onSearch={onSearch} />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Icon name="favorite_border" />
            </button>
            <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Icon name="person_outline" />
            </button>
            <button className="md:hidden p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Icon name="menu" />
            </button>
            <button className="hidden md:flex ml-2 items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
