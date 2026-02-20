"use client";

import React from "react";
import { Icon } from "@/shared/components/Icon";
import type { StoreVendor } from "../types";

interface StorePaymentsProps {
  vendor: StoreVendor;
}

const paymentConfig = [
  {
    key: "transferencia" as const,
    label: "Transferencia",
    icon: "account_balance_wallet",
    colorClass: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
  },
  {
    key: "efectivo" as const,
    label: "Efectivo",
    icon: "payments",
    colorClass: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "mercadopago" as const,
    label: "Mercado Pago",
    icon: "credit_card",
    colorClass: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  },
];

export function StorePayments({ vendor }: StorePaymentsProps) {
  const methods = vendor.paymentMethods;
  if (!methods?.length) return null;

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 md:mb-6">
          Recibe pagos con
        </h2>
        <div className="flex flex-wrap gap-4 md:gap-6">
          {paymentConfig.map(({ key, label, icon, colorClass }) => {
            if (!methods.includes(key)) return null;
            return (
              <div
                key={key}
                className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-full md:rounded-xl ${colorClass}`}
              >
                <Icon name={icon} className="text-xl md:text-2xl" />
                <span className="text-sm md:text-base font-semibold">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
