"use client";

import React, { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { Icon } from "@/shared/components/Icon";
import { useTheme } from "@/shared/providers";
import {
  LocationSelector,
  type LocationData,
} from "@/features/location-selector";

interface Category {
  id: string;
  name: string;
}

interface HeaderProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onSearch?: (value: string) => void;
  locations?: LocationData[];
  onLocationChange?: (provincia: string, localidad: string) => void;
  hideLocation?: boolean

}

const defaultLocations: LocationData[] = [
  {
    provincia: "GBA Sur",
    localidades: ["Avellaneda", "Quilmes"],
  },
  {
    provincia: "GBA Norte",
    localidades: ["Olivos", "Martinez"],
  },
];

export function Header({
  onSearch,
  locations = defaultLocations,
  onLocationChange,
  hideLocation = false
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2">
          <Logo />
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              suppressHydrationWarning
            >
              {mounted && (
                <Icon
                  name={isDark ? "light_mode" : "dark_mode"}
                  className="text-base"
                />
              )}
            </button>
            <button
              className="p-2 text-slate-200 dark:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Favoritos"
            >
              <Icon name="favorite" className="text-xl" />
            </button>
            <button
              className="p-2 text-slate-200 dark:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Mi Perfil"
            >
              <Icon name="person" className="text-xl" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 gap-2 block min-[360px]:flex">
          {
            !hideLocation &&
          <div className="mb-2 min-[360px]:mb-0">

            <LocationSelector
              locations={locations}
              onLocationChange={onLocationChange}
              variant="button"
              />
              </div>
            }

          <SearchBar onSearch={onSearch} placeholder="Buscar..." />
        </div>
      </div>

      {/* Tablet/Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-2 lg:gap-4">
            <Logo />
            <div className="hidden lg:flex">
              <LocationSelector
                locations={locations}
                onLocationChange={onLocationChange}
                variant="button"
              />
            </div>
            <div className="flex-1 flex items-center max-w-xs lg:max-w-md mx-2 lg:mx-4 min-w-0">
              <div className="relative w-full">
                <Icon
                  name="search"
                  className="absolute mt-2 inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none text-slate-400 text-lg lg:text-xl"
                />
                <input
                  type="text"
                  className="block w-full pl-9 lg:pl-11 pr-3 lg:pr-4 py-2 lg:py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-xs lg:text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Buscar..."
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
            <nav className="hidden xl:flex items-center gap-4 lg:gap-6 mr-2 lg:mr-4 shrink-0">
              <a
                className="text-[10px] lg:text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors whitespace-nowrap"
                href="#"
              >
                Categorías
              </a>
            </nav>
            <div className="flex items-center gap-0.5 lg:gap-1 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                suppressHydrationWarning
              >
                {mounted && (
                  <Icon
                    name={isDark ? "light_mode" : "dark_mode"}
                    className="text-base"
                  />
                )}
              </button>
              <button
                className="p-2 lg:p-2.5 text-slate-200 dark:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Favoritos"
              >
                <Icon name="favorite" className="text-lg lg:text-xl" />
              </button>
              <button
                className="p-2 lg:p-2.5 text-slate-200 dark:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Mi Perfil"
              >
                <Icon name="person" className="text-lg lg:text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
