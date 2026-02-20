"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StorePersonalInfoProps {
  vendor: StoreVendor;
}

const contactConfig = [
  {
    key: "email" as const,
    label: "Email",
    icon: "mail",
    href: (info: NonNullable<StoreVendor["personalInfo"]>) =>
      info.email ? `mailto:${info.email}` : null,
    text: (info: NonNullable<StoreVendor["personalInfo"]>) => info.email,
    isLink: true,
  },
  {
    key: "phone" as const,
    label: "Teléfono",
    icon: "call",
    href: (info: NonNullable<StoreVendor["personalInfo"]>) =>
      info.phone ? `tel:${info.phone}` : null,
    text: (info: NonNullable<StoreVendor["personalInfo"]>) => info.phone,
    isLink: true,
  },
  {
    key: "address" as const,
    label: "Dirección",
    icon: "location_on",
    href: () => null,
    text: (info: NonNullable<StoreVendor["personalInfo"]>) => info.address,
    isLink: false,
  },
  {
    key: "website" as const,
    label: "Sitio web",
    icon: "language",
    href: (info: NonNullable<StoreVendor["personalInfo"]>) => info.website ?? null,
    text: (info: NonNullable<StoreVendor["personalInfo"]>) => info.website,
    isLink: true,
  },
];

export function StorePersonalInfo({ vendor }: StorePersonalInfoProps) {
  const info = vendor.personalInfo;
  if (!info) return null;

  const items = contactConfig
    .map(({ key, label, icon, href, text, isLink }) => {
      const value = text(info);
      if (!value) return null;
      const url = isLink ? href(info) : null;
      return { key, label, icon, value, url, isLink };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (items.length === 0) return null;

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 md:mb-6">
          Contacto
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map(({ key, label, icon, value, url, isLink }) => {
            const base =
              "flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 py-3 transition-colors";
            const interactive =
              isLink && url
                ? "hover:border-emerald-400/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 dark:hover:border-emerald-500/40"
                : "";

            const content = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                  <Icon name={icon} className="text-xl" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                    {label}
                  </span>
                  <span className="block truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {value}
                  </span>
                </div>
              </>
            );

            if (isLink && url) {
              return (
                <a
                  key={key}
                  href={url}
                  target={key === "website" ? "_blank" : undefined}
                  rel={key === "website" ? "noopener noreferrer" : undefined}
                  className={`${base} ${interactive}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={key} className={base}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
