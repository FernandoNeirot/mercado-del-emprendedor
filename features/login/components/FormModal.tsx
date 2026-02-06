"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

const ANIMATION_DURATION_MS = 300;

export interface FormModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Solo móvil: título o null. En desktop no se muestra cabecera con X. */
  title?: string | null;
  /** Clase extra para el contenedor del contenido (card/sheet). */
  contentClassName?: string;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    m.addEventListener("change", handler);
    queueMicrotask(() => setMatches(m.matches));
    return () => m.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function FormModal({
  open,
  onClose,
  children,
  title = null,
  contentClassName,
}: FormModalProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [entered, setEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      setEntered(false);
      setIsExiting(false);
    });
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), ANIMATION_DURATION_MS);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    handleClose();
  };

  if (!open) return null;

  const showContent = entered && !isExiting;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal"}
    >
      <div
        onClick={handleOverlayClick}
        className={cn(
          "absolute inset-0 bg-black/50 dark:bg-black/60 transition-opacity duration-300 ease-out",
          !showContent && "opacity-0"
        )}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md md:max-h-[90vh] md:overflow-auto",
          "bg-white dark:bg-slate-900 shadow-xl",
          "rounded-t-3xl md:rounded-2xl",
          "transition-all duration-300 ease-out",
          "flex flex-col",
          contentClassName
        )}
        style={
          isMobile
            ? {
                transform: showContent ? "translateY(0)" : "translateY(100%)",
                maxHeight: "100dvh",
              }
            : {
                transform: showContent ? "scale(1)" : "scale(0.96)",
                opacity: showContent ? 1 : 0,
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {isMobile && (
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {title ?? ""}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 -m-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>
        )}

        <div className="flex flex-1 flex-col overflow-auto mb-25">{children}</div>
      </div>
    </div>
  );
}
