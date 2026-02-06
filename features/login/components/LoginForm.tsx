"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

export interface LoginFormProps {
  onSubmit?: (data: { usuario: string; contraseña: string }) => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
  className?: string;
  disabled?: boolean;
}

export function LoginForm({
  onSubmit,
  onSwitchToRegister,
  onForgotPassword,
  className,
  disabled = false,
}: LoginFormProps) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ usuario, contraseña });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4 p-4 md:p-6", className)}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-usuario"
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          Usuario
        </label>
        <div className="relative">
          <Icon
            name="person"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none"
          />
          <input
            id="login-usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
            placeholder="Tu usuario o email"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-contraseña"
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          Contraseña
        </label>
        <div className="relative">
          <Icon
            name="lock"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none"
          />
          <input
            id="login-contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            // autoComplete="current-password"
            placeholder="Tu contraseña"
            className={inputStyles}
          />
        </div>
      </div>

      {onForgotPassword && (
        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-primary hover:underline focus:outline-none focus:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={disabled}
      >
        Ingresar
      </Button>

      {onSwitchToRegister && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onSwitchToRegister}
          disabled={disabled}
        >
          Registrarse
        </Button>
      )}
    </form>
  );
}

const inputStyles =
  "w-full pl-10 pr-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none";
