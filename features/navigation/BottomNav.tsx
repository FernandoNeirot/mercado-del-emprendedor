"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

interface BottomNavProps {
  items?: NavItem[];
  currentPath?: string;
}

const defaultNavItems: NavItem[] = [
  {
    id: "home",
    label: "Inicio",
    icon: "home",
    href: "/",
    active: true,
  },
  {
    id: "explore",
    label: "Explorar",
    icon: "explore",
    href: "/explore",
  },
  {
    id: "favorites",
    label: "Favoritos",
    icon: "favorite",
    href: "/favorites",
  },
  {
    id: "profile",
    label: "Perfil",
    icon: "person",
    href: "/profile",
  },
];

export function BottomNav({ items = defaultNavItems, currentPath }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-8 pt-3 px-10 z-70 dark:bg-gradient-to-t dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" >
      <div className="flex justify-between items-center">
      {items.map((item) => {
        const isActive = currentPath === item.href || item.active;
        return (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
          "flex flex-col items-center gap-1",
          isActive ? "text-primary" : "text-slate-400"
          )}
        >
          <Icon
          name={item.icon}
          className="text-2xl"
          filled={isActive}
          />
          <span
          className={cn(
            "text-[10px]",
            isActive ? "font-bold" : "font-medium"
          )}
          >
          {item.label}
          </span>
        </Link>
        );
      })}
      </div>
    </nav>
  );
}
