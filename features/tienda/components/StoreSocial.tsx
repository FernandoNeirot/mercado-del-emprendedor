"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StoreSocialProps {
  vendor: StoreVendor;
}

const socialConfig = [
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: "photo_camera",
    colorClass: "bg-gradient-to-br from-pink-500 to-orange-500 text-white",
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: "thumb_up",
    colorClass: "bg-blue-600 text-white",
  },
  {
    key: "tiktok" as const,
    label: "TikTok",
    icon: "music_note",
    colorClass: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900",
  },
];

export function StoreSocial({ vendor }: StoreSocialProps) {
  const links = vendor.socialLinks;
  if (!links) return null;

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 md:mb-6">
          Seguime en redes
        </h2>
        <div className="flex gap-4 md:gap-6">
          {socialConfig.map(({ key, label, icon, colorClass }) => {
            const href = links[key];
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${colorClass} hover:opacity-90 transition-opacity`}
                aria-label={label}
              >
                <Icon name={icon} className="text-2xl md:text-3xl" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
