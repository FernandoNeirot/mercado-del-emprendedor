"use client";

import React from "react";
import type { StoreVendor } from "../types";
import { cn } from "@/shared/utils/cn";

interface StoreStoryProps {
  vendor: StoreVendor;
  isStoreTab?: boolean;
}

export function StoreStory({ vendor, isStoreTab }: StoreStoryProps) {
  const story = vendor.story;
  if (!story) return null;

  return (
    <section
      className={cn(
        "p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800",
        isStoreTab && "min-h-[calc(100dvh-220px)] flex flex-col"
      )}
    >
      <div className="flex items-start gap-4 md:gap-6 max-w-3xl mx-auto">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vendor?.logoUrl ?? ""}
            alt={vendor.name}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Mi Historia
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-0.5">
            por {story.founderName}
          </p>
          <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 [&_strong]:font-bold [&_em]:italic [&_u]:underline">
            {story.paragraphs.map((paragraph, i) =>
              paragraph.trim().startsWith("<") ? (
                <div
                  key={i}
                  className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ) : (
                <p
                  key={i}
                  className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>
      </div>
      {isStoreTab && <div className="mt-6 md:mt-8 flex-1 min-h-px" aria-hidden />}
    </section>
  );
}
