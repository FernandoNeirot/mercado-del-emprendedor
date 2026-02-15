"use client";

import React, { useState } from "react";
import type { ServerUser } from "@/shared/lib/auth";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { sendVerificationEmail } from "@/lib/client-auth";

export interface EmailVerificationGuardProps {
  user: ServerUser | null;
  children: React.ReactNode;
}

/**
 * Si el usuario está logueado pero no confirmó su correo, muestra una pantalla
 * bloqueada con el mensaje de que debe confirmar el registro en su mail.
 */
export function EmailVerificationGuard({ user, children }: EmailVerificationGuardProps) {
  const [showResend, setShowResend] = useState(false);
  const [password, setPassword] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resendError, setResendError] = useState<string | null>(null);

  if (!user || user.emailVerified) {
    return <>{children}</>;
  }

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !password.trim()) return;
    setResendStatus("loading");
    setResendError(null);
    const err = await sendVerificationEmail(user.email, password);
    setResendStatus(err ? "error" : "success");
    setResendError(err ?? null);
    if (!err) setPassword("");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/95 dark:bg-slate-950/95 p-4">
      <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-6 md:p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4">
          <Icon name="mail" className="text-2xl text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Confirmá tu registro
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Te enviamos un correo a <strong className="text-slate-700 dark:text-slate-300">{user.email}</strong>.
          Abrí el enlace que aparece en el mail para confirmar tu cuenta y poder usar el dashboard.
        </p>
        <p className="mt-4 text-slate-500 dark:text-slate-500 text-xs">
          Si no ves el correo, revisá la carpeta de spam.
        </p>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          {!showResend ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => setShowResend(true)}
            >
              Reenviar correo de verificación
            </Button>
          ) : (
            <form onSubmit={handleResend} className="space-y-3 text-left">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                Contraseña (para reenviar el correo)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                autoComplete="current-password"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    setShowResend(false);
                    setResendStatus("idle");
                    setResendError(null);
                    setPassword("");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1"
                  disabled={resendStatus === "loading" || !password.trim()}
                >
                  {resendStatus === "loading" ? "Enviando…" : "Reenviar"}
                </Button>
              </div>
              {resendStatus === "success" && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Correo reenviado. Revisá tu bandeja y spam.
                </p>
              )}
              {resendStatus === "error" && resendError && (
                <p className="text-sm text-red-600 dark:text-red-400">{resendError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
