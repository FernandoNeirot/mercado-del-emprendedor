"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StoreAvailableProps {
  vendor: StoreVendor;
}

export function StoreAvailable({ vendor }: StoreAvailableProps) {
  const schedule = vendor.availability ?? [];
  if (!schedule.length) return null;

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Icon
            name="schedule"
            className="text-lg text-primary"
          />
          <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Horarios de atención
          </h2>
        </div>
        <div className="rounded-xl md:rounded-2xl max-w-[350px] overflow-hidden bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {schedule.map((item) => {
              const displayText =
                (item?.availability?.trim() || "Cerrado");
              const isClosed =
                displayText.toLowerCase().includes("cerrado");
              return (
                <li
                  key={item.day}
                  className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-200">
                    {item.day}
                  </span>
                  <span
                    className={`text-sm md:text-base font-medium ${isClosed
                      ? "text-slate-400 dark:text-slate-500"
                      : "text-primary dark:text-emerald-500"
                      }`}
                  >
                    {displayText}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
