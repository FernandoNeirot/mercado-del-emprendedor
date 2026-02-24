"use client";

import React from "react";
import type { StoreFormState } from "../types";
import type { StoreAvailability } from "@/features/tienda/types";

interface StoreEditorTabInformacionProps {
  form: StoreFormState;
  onChange: (updates: Partial<StoreFormState>) => void;
}

const PAYMENT_OPTIONS: ("transferencia" | "efectivo" | "mercadopago")[] = [
  "transferencia",
  "efectivo",
  "mercadopago",
];

const DAYS: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export function StoreEditorTabInformacion({ form, onChange }: StoreEditorTabInformacionProps) {
  const personal = form.personalInfo ?? {};
  const social = form.socialLinks ?? {};
  const paymentMethods = form.paymentMethods ?? [];
  const availabilityList = form.availability ?? [];

  const getAvailabilityForDay = (day: string) =>
    availabilityList.find((a) => a.day === day)?.availability ?? "";

  const setPersonal = (key: keyof NonNullable<StoreFormState["personalInfo"]>, value: string) =>
    onChange({ personalInfo: { ...personal, [key]: value } });

  const setSocial = (key: keyof NonNullable<StoreFormState["socialLinks"]>, value: string) =>
    onChange({ socialLinks: { ...social, [key]: value } });

  const setAvailabilityForDay = (day: string, value: string) => {
    const next: StoreAvailability[] = DAYS.map((d) => ({
      day: d,
      availability: d === day ? value : getAvailabilityForDay(d),
    }));
    onChange({ availability: next });
  };

  const togglePayment = (method: (typeof PAYMENT_OPTIONS)[number]) => {
    const next = paymentMethods.includes(method)
      ? paymentMethods.filter((m) => m !== method)
      : [...paymentMethods, method];
    onChange({ paymentMethods: next });
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Contacto y datos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["email", "Email"],
              ["phone", "Teléfono"],
              ["website", "Sitio web"],
              ["address", "Dirección"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                {label}
              </span>
              <input
                type="text"
                value={personal[key] ?? ""}
                onChange={(e) => setPersonal(key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Horarios de atención
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Ej: &quot;9:00 - 18:00&quot; o &quot;Cerrado&quot;
        </p>
        <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden divide-y divide-slate-200 dark:divide-slate-600 max-w-md">
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between gap-4 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 shrink-0 w-24">
                {day}
              </span>
              <input
                type="text"
                value={getAvailabilityForDay(day)}
                onChange={(e) => setAvailabilityForDay(day, e.target.value)}
                placeholder="Ej. 9:00 - 18:00"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Redes sociales
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(["instagram", "facebook", "tiktok"] as const).map((key) => (
            <label key={key} className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <input
                type="url"
                value={social[key] ?? ""}
                onChange={(e) => setSocial(key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                placeholder="https://..."
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Medios de pago
        </h2>
        <div className="flex flex-wrap gap-3">
          {PAYMENT_OPTIONS.map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={paymentMethods.includes(method)}
                onChange={() => togglePayment(method)}
                className="rounded border-slate-300 text-primary"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                {method}
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
