"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

export interface RegisterFormProps {
  onSubmit?: (data: { usuario: string; contraseña: string }) => void;
  onSwitchToLogin?: () => void;
  className?: string;
  disabled?: boolean;
}

export function RegisterForm({
  onSubmit,
  onSwitchToLogin,
  className,
  disabled = false,
}: RegisterFormProps) {
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
          htmlFor="register-usuario"
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
            id="register-usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
            placeholder="Elige un usuario o email"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="register-contraseña"
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
            id="register-contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            autoComplete="new-password"
            placeholder="Crea una contraseña"
            className={inputStyles}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={disabled}
      >
        Crear cuenta
      </Button>

      {onSwitchToLogin && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onSwitchToLogin}
          disabled={disabled}
        >
          Ya tengo cuenta
        </Button>
      )}
    </form>
  );
}

const inputStyles =
  "w-full pl-10 pr-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none";
