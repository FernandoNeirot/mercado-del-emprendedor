"use client";

import React, { useState } from "react";
import { FormModal } from "./FormModal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { login, register } from "@/lib/client-auth";

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
      title={mode === "login" ? "Ingresar" : "Registrarse"}
      contentClassName="min-h-0"
    >
      {error && (
        <div className="px-4 pt-4 pb-0 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      {mode === "login" ? (
        <LoginForm
          onSubmit={handleLogin}
          onSwitchToRegister={() => setMode("register")}
          onForgotPassword={() => {}}
          disabled={loading}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          onSwitchToLogin={() => setMode("login")}
          disabled={loading}
        />
      )}
    </FormModal>
  );
}
