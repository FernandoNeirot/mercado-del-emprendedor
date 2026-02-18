"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import type { StoreFormState } from "../types";

interface StoreEditorHeaderProps {
  form: StoreFormState;
  onChange: (updates: Partial<StoreFormState>) => void;
  isCreating: boolean;
  logoFile?: File | null;
  onLogoFileChange?: (file: File | null) => void;
  /** URL del logo guardado (de la tienda), para que la preview cargue en la primera entrada. */
  initialLogoUrl?: string | null;
  bannerFile?: File | null;
  onBannerFileChange?: (file: File | null) => void;
  /** URL del banner guardado, para que la preview cargue en la primera entrada. */
  initialBannerUrl?: string | null;
}

export function StoreEditorHeader({
  form,
  onChange,
  isCreating,
  logoFile = null,
  onLogoFileChange,
  initialLogoUrl = null,
  bannerFile = null,
  onBannerFileChange,
  initialBannerUrl = null,
}: StoreEditorHeaderProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const logoPreviewUrl = useMemo(
    () => (logoFile != null ? URL.createObjectURL(logoFile) : null),
    [logoFile]
  );

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const displayLogoUrl =
    logoPreviewUrl ?? form.logoUrl ?? initialLogoUrl ?? null;

  const bannerPreviewUrl = useMemo(
    () => (bannerFile != null ? URL.createObjectURL(bannerFile) : null),
    [bannerFile]
  );

  useEffect(() => {
    return () => {
      if (bannerPreviewUrl) URL.revokeObjectURL(bannerPreviewUrl);
    };
  }, [bannerPreviewUrl]);

  const displayBannerUrl =
    bannerPreviewUrl ?? form.bannerUrl ?? initialBannerUrl ?? null;

  const clientsValue = form.stats?.clients ?? "";
  const salesValue = form.stats?.sales ?? "";
  const activeClientsOrSales =
    clientsValue ? "clients" : salesValue ? "sales" : null;
  const [clientsOrSalesTab, setClientsOrSalesTab] = useState<"clients" | "sales">(
    () => (clientsValue ? "clients" : salesValue ? "sales" : "clients")
  );
  const currentTab = activeClientsOrSales ?? clientsOrSalesTab;
  useEffect(() => {
    if (clientsValue) queueMicrotask(() => setClientsOrSalesTab("clients"));
    else if (salesValue) queueMicrotask(() => setClientsOrSalesTab("sales"));
  }, [clientsValue, salesValue]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type.startsWith("image/")) {
      onLogoFileChange?.(file);
    }
    e.target.value = "";
  };

  const clearLogo = () => {
    onLogoFileChange?.(null);
    onChange({ logoUrl: "" });
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type.startsWith("image/")) {
      onBannerFileChange?.(file);
    }
    e.target.value = "";
  };

  const clearBanner = () => {
    onBannerFileChange?.(null);
    onChange({ bannerUrl: "" });
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  return (
    <header className="relative bg-slate-100 dark:bg-slate-900 overflow-hidden rounded-t-2xl border border-slate-200 dark:border-slate-700">
      <div className="p-4 md:p-6 lg:p-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {isCreating ? "Nueva tienda" : "Datos de la tienda"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Nombre
            </span>
            <input
              type="text"
              value={form.name ?? ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="Ej. Feni Indumentaria"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Slug (URL)
            </span>
            <input
              type="text"
              value={form.slug ?? ""}
              onChange={(e) =>
                onChange({
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="feni-indumentaria-infantil"
            />
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              https://mercadodelemprendedor.com/tienda/{form.slug}
            </span>
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Tagline
          </span>
          <input
            type="text"
            value={form.tagline ?? ""}
            onChange={(e) => onChange({ tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
            placeholder="Moda infantil sustentable"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Clientes o Ventas (uno solo)
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setClientsOrSalesTab("clients");
                    onChange({
                      stats: { ...form.stats, clients: clientsValue, sales: "" },
                    });
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentTab === "clients"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Clientes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setClientsOrSalesTab("sales");
                    onChange({
                      stats: { ...form.stats, clients: "", sales: salesValue },
                    });
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentTab === "sales"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Ventas
                </button>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                <span className="flex items-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium">
                  +
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={
                    currentTab === "clients"
                      ? clientsValue.replace(/^\+/, "").replace(/\D/g, "")
                      : salesValue.replace(/^\+/, "").replace(/\D/g, "")
                  }
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    const newValue = digits ? `+${digits}` : "";
                    onChange({
                      stats: {
                        ...form.stats,
                        [currentTab]: newValue,
                        clients: currentTab === "clients" ? newValue : "",
                        sales: currentTab === "sales" ? newValue : "",
                      },
                    });
                  }}
                  placeholder="Solo números"
                  className="flex-1 min-w-0 px-3 py-2 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </label>
          {(["location", "yearsInBusiness"] as const).map((key) => {
            const rawValue = form.stats?.[key] ?? "";
            return (
              <label key={key} className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {key === "location" && "Ubicación"}
                  {key === "yearsInBusiness" && "Tiempo en el negocio"}
                </span>
                <input
                  type="text"
                  value={rawValue}
                  onChange={(e) =>
                    onChange({
                      stats: { ...form.stats, [key]: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                />
              </label>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Logo
            </span>
            <div className="flex flex-col gap-2">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-white file:cursor-pointer"
              />
              {displayLogoUrl && (
                <div className="relative inline-flex w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={displayLogoUrl}
                    src={displayLogoUrl}
                    alt="Vista previa del logo"
                    className="h-16 w-16 rounded-lg object-contain border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={clearLogo}
                    className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-slate-700 text-white text-sm leading-none flex items-center justify-center hover:bg-slate-600"
                    aria-label="Quitar logo"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>        
          </div>
          <div className="block">
            <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Banner
            </span>
            <div className="flex flex-col gap-2">
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-white file:cursor-pointer"
              />
              {displayBannerUrl && (
                <div className="relative inline-flex w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={displayBannerUrl}
                    src={displayBannerUrl}
                    alt="Vista previa del banner"
                    className="h-20 w-full max-w-[240px] rounded-lg object-cover border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={clearBanner}
                    className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-slate-700 text-white text-sm leading-none flex items-center justify-center hover:bg-slate-600"
                    aria-label="Quitar banner"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
