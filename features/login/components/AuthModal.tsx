"use client";

import React, { useState } from "react";
import { FormModal } from "./FormModal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
  onLogin?: (data: { usuario: string; contraseña: string }) => void;
  onRegister?: (data: { usuario: string; contraseña: string }) => void;
  onForgotPassword?: () => void;
}

export function AuthModal({
  open,
  onClose,
  defaultMode = "login",
  onLogin,
  onRegister,
  onForgotPassword,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);

  const handleClose = () => {
    onClose();
    setMode(defaultMode);
  };

  return (
    <FormModal
      open={open}
      onClose={handleClose}
      title={mode === "login" ? "Ingresar" : "Registrarse"}
      contentClassName="min-h-0"
    >
      {mode === "login" ? (
        <LoginForm
          onSubmit={onLogin}
          onSwitchToRegister={() => setMode("register")}
          onForgotPassword={onForgotPassword}
        />
      ) : (
        <RegisterForm
          onSubmit={onRegister}
          onSwitchToLogin={() => setMode("login")}
        />
      )}
    </FormModal>
  );
}
