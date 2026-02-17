"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icon";
import { refreshSession } from "./actions";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [refreshing, setRefreshing] = useState(true);
  const error = searchParams.get("error") === "1";
  const continueUrlParam = searchParams.get("continueUrl");

  useEffect(() => {
    if (error) {
      queueMicrotask(() => setRefreshing(false));
      return;
    }
    refreshSession().finally(() => setRefreshing(false));
  }, [error]);

  const goToDashboard = () => {
    if (continueUrlParam) {
      try {
        const decoded = decodeURIComponent(continueUrlParam);
        if (decoded.startsWith("http") && decoded.includes(window.location.origin)) {
          window.location.href = decoded;
          return;
        }
      } catch {
        /* ignore */
      }
    }
    router.push("/dashboard");
  };

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-6 md:p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
            <Icon name="warning" className="text-2xl text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Enlace inválido o expirado
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            El enlace de verificación ya fue usado o venció. Solicitá uno nuevo desde tu cuenta.
          </p>
          <Button variant="primary" size="md" onClick={() => router.push("/")}>
            Ir al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-6 md:p-8 text-center">
        {refreshing ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center animate-pulse">
              <Icon name="check_circle" className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Actualizando tu sesión…</p>
          </div>
        ) : (
          <>
            <div className="mx-auto w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
              <Icon name="check_circle" className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Correo verificado
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Tu dirección de correo quedó confirmada. Ya podés usar tu cuenta con normalidad.
            </p>
            <Button variant="primary" size="lg" className="w-full" onClick={goToDashboard}>
              Ir al dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
