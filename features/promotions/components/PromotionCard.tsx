"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";

interface PromotionCardProps {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  bgColor: "amber" | "emerald" | "blue" | "purple";
}

export function PromotionCard({
  badge,
  title,
  description,
  buttonText,
  icon,
  bgColor,
}: PromotionCardProps) {
  const colorClasses = {
    amber: {
      bg: "bg-amber-50 dark:bg-slate-800",
      border: "border-amber-100 dark:border-slate-700",
      badge: "bg-amber-500",
      icon: "text-amber-200/40 dark:text-slate-700/50",
      button: "text-primary dark:text-amber-400",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-slate-800",
      border: "border-emerald-100 dark:border-slate-700",
      badge: "bg-emerald-500",
      icon: "text-emerald-200/40 dark:text-slate-700/50",
      button: "text-primary dark:text-emerald-400",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-slate-800",
      border: "border-blue-100 dark:border-slate-700",
      badge: "bg-blue-500",
      icon: "text-blue-200/40 dark:text-slate-700/50",
      button: "text-primary dark:text-blue-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-slate-800",
      border: "border-purple-100 dark:border-slate-700",
      badge: "bg-purple-500",
      icon: "text-purple-200/40 dark:text-slate-700/50",
      button: "text-primary dark:text-purple-400",
    },
  };

  const colors = colorClasses[bgColor];

  return (
    <div
      className={`min-w-60 sm:min-w-[260px] md:min-w-[280px] ${colors.bg} p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl border ${colors.border} relative overflow-hidden group`}
    >
      <div className="relative z-10">
        <span className={`${colors.badge} text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase`}>
          {badge}
        </span>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {description}
        </p>
        <button className={`${colors.button} text-sm font-bold flex items-center gap-1 hover:underline`}>
          {buttonText} <Icon name="arrow_forward" className="text-xs" />
        </button>
      </div>
      <Icon
        name={icon}
        className={`absolute -right-4 -bottom-4 text-9xl ${colors.icon} rotate-12`}
      />
    </div>
  );
}
