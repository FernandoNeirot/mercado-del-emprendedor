"use client";

import React, { useState } from "react";
import { FormModal } from "./FormModal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { login, register } from "@/lib/client-auth";
import { cn } from "@/shared/utils/cn";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
  onAuthSuccess?: () => void;
}

export function AuthModal({
  open,
  onClose,
  defaultMode = "login",
  onAuthSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { usuario: string; contraseña: string }) => {
    setLoading(true);
    setError(null);
    const result = await login(data.usuario, data.contraseña);
    setLoading(false);
    if ("user" in result) {
      onClose();
      onAuthSuccess?.();
    } else {
      setError(result.error);
    }
  };

  const handleRegister = async (data: { usuario: string; contraseña: string }) => {
    setLoading(true);
    setError(null);
    const result = await register(data.usuario, data.contraseña);
    setLoading(false);
    if ("user" in result) {
      onClose();
      onAuthSuccess?.();
    } else {
      setError(result.error);
    }
  };

  const handleClose = () => {
    onClose();
    setMode(defaultMode);
    setError(null);
  };

  return (
    <FormModal
      open={open}
      onClose={handleClose}
      title="Cuenta"
      contentClassName="min-h-0"
    >
      {/* Tabs Ingresar | Registrarse */}
      <div className="flex shrink-0 border-b border-slate-200 dark:border-slate-700">
        <div className="relative flex w-full">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={cn(
              "relative z-10 flex-1 py-3.5 text-sm font-semibold transition-colors",
              mode === "login"
                ? "text-primary dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={cn(
              "relative z-10 flex-1 py-3.5 text-sm font-semibold transition-colors",
              mode === "register"
                ? "text-primary dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Registrarse
          </button>
          {/* Indicador deslizante */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-primary dark:bg-emerald-400 transition-all duration-200 ease-out"
            style={{
              width: "50%",
              transform: mode === "register" ? "translateX(100%)" : "translateX(0)",
            }}
          />
        </div>
      </div>

      {error && (
        <div className="px-4 pt-4 pb-0 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      {mode === "login" ? (
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={() => {}}
          disabled={loading}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          disabled={loading}
        />
      )}
    </FormModal>
  );
}
