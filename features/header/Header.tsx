"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { Icon } from "@/shared/components/Icon";
import { useTheme } from "@/shared/providers";
import {
  LocationSelector,
  type LocationData,
} from "@/features/location-selector";
import { AuthModal } from "@/features/login";
import { logout } from "@/lib/client-auth";
import type { AuthUser } from "@/lib/client-auth";

interface Category {
  id: string;
  name: string;
}

interface HeaderProps {
  /** Usuario desde el servidor: evita parpadeo y validación inmediata. */
  initialUser?: AuthUser | null;
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onSearch?: (value: string) => void;
  locations?: LocationData[];
  onLocationChange?: (provincia: string, localidad: string) => void;
  hideLocation?: boolean;
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
  initialUser = null,
  onSearch,
  locations = defaultLocations,
  onLocationChange,
  hideLocation = false,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isTiendaPage = pathname?.startsWith("/tienda") ?? false;
  const isPrivatePage = pathname?.startsWith("/dashboard") ?? false;
  const showLocation = !hideLocation && !isTiendaPage && !isPrivatePage;
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRefMobile = useRef<HTMLDivElement>(null);
  const profileMenuRefDesktop = useRef<HTMLDivElement>(null);
  const buscarFromUrl = searchParams?.get("buscar") ?? "";
  const [tiendaSearch, setTiendaSearch] = useState(buscarFromUrl);
  useEffect(() => {
    setTiendaSearch(buscarFromUrl);
  }, [pathname, buscarFromUrl]);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inside = [profileMenuRefMobile.current, profileMenuRefDesktop.current].some(
        (el) => el?.contains(target)
      );
      if (!inside) setProfileMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
    setUser(null);
    router.refresh();
  };

  const handleSearch = (value: string) => {
    if (isTiendaPage) {
      setTiendaSearch(value);
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value.trim()) params.set("buscar", value);
      else params.delete("buscar");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname ?? "/", { scroll: false });
    } else {
      onSearch?.(value);
    }
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProfileClick = () => {
    if (!user) setAuthOpen(true);
  };

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
            {user ? (
              <div className="relative" ref={profileMenuRefMobile}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((o) => !o)}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  title="Mi Perfil"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                >
                  <Icon name="person" className="text-xl" />
                </button>
                {profileMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 py-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                    role="menu"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-t-lg transition-colors"
                      role="menuitem"
                      prefetch
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <Icon name="dashboard" className="text-lg" />
                      Ir al dashboard
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-b-lg transition-colors"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <Icon name="logout" className="text-lg" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleProfileClick}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Mi Perfil"
              >
                <Icon name="person" className="text-xl" />
              </button>
            )}
          </div>
        </div>
        <div className="px-4 pb-3 gap-2 block min-[360px]:flex">
          {showLocation && (
            <div className="mb-2 min-[360px]:mb-0">
              <LocationSelector
                locations={locations}
                onLocationChange={onLocationChange}
                variant="button"
              />
            </div>
          )}
          {!isPrivatePage && (
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar..."
              value={isTiendaPage ? tiendaSearch : ""}
            />
          )}
        </div>
      </div>

      {/* Tablet/Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-2 lg:gap-4">
            <Logo />
            <div className="flex items-center gap-2 lg:gap-4 w-full">
              {showLocation && (
                <div className="hidden lg:flex">
                  <LocationSelector
                    locations={locations}
                    onLocationChange={onLocationChange}
                    variant="button"
                  />
                </div>
              )}
              {!isPrivatePage && (
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
                      value={isTiendaPage ? tiendaSearch : ""}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
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
              {user ? (
                <div className="relative" ref={profileMenuRefDesktop}>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((o) => !o)}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    title="Mi Perfil"
                    aria-expanded={profileMenuOpen}
                    aria-haspopup="true"
                  >
                    <Icon name="person" className="text-lg lg:text-xl" />
                  </button>
                  {profileMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-1 py-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                      role="menu"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-t-lg transition-colors"
                        role="menuitem"
                        prefetch
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Icon name="dashboard" className="text-lg" />
                        Ir al dashboard
                      </Link>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-b-lg transition-colors"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        <Icon name="logout" className="text-lg" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleProfileClick}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  suppressHydrationWarning
                  title="Mi Perfil"
                >
                  <Icon name="person" className="text-lg lg:text-xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={() => router.refresh()}
      />
    </header>
  );
}
