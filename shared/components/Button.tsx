import React from "react";
import { cn } from "@/shared/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold transition-colors rounded-full";
  
  const variants = {
    primary: "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90",
    secondary: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
    outline: "bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2 text-xs",
    lg: "px-6 py-3 text-sm",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
