"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import { Button } from "@/shared/components/Button";

interface PromotionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  bgColor: "primary" | "accent-green";
}

export function PromotionCard({
  title,
  description,
  buttonText,
  icon,
  bgColor,
}: PromotionCardProps) {
  const bgClass =
    bgColor === "primary" ? "bg-primary" : "bg-secondary";
  const buttonBgClass =
    bgColor === "primary" ? "text-primary" : "text-secondary";
  const descriptionClass =
    bgColor === "primary" ? "text-emerald-100" : "text-white/80";

  return (
    <div
      className={`min-w-[300px] md:min-w-0 md:h-56 ${bgClass} rounded-3xl md:rounded-2xl p-5 md:p-8 relative flex items-center overflow-hidden group`}
    >
      <div className="z-10 md:max-w-[60%]">
        <h3 className="text-white font-bold text-lg md:text-3xl leading-tight mb-2">
          {title}
        </h3>
        <p className={`${descriptionClass} text-xs md:text-base mb-2 md:mb-6`}>
          {description}
        </p>
        <button
          className={`mt-2 md:mt-0 text-[10px] md:text-sm font-bold ${buttonBgClass} bg-white px-3 md:px-6 py-1 md:py-2 rounded-full uppercase tracking-wider hover:scale-105 transition-transform`}
        >
          {buttonText}
        </button>
      </div>
      <Icon
        name={icon}
        className="absolute -right-4 -bottom-4 md:right-0 md:top-0 md:bottom-0 md:w-1/2 md:opacity-20 pointer-events-none md:flex md:items-center md:justify-center text-white/10 md:text-white text-9xl md:text-[180px]"
      />
    </div>
  );
}
