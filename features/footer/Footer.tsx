"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@/shared/components/Icon";
import { useTheme } from "@/shared/providers/ThemeProvider";

export function Footer() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <footer className="hidden md:block bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Icon name="storefront" className="text-sm" />
              </div>
              <p className="font-bold text-xl">Mercado del Emprendedor</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              Conectamos el talento local con personas que valoran lo artesanal y
              lo hecho a mano.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <Icon name="facebook" />
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <Icon name="camera_alt" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Emprendedores
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Promociones
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Precios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Soporte</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Ayuda
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Términos
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacidad
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 Mercado del Emprendedor. Hecho con ❤️ para la comunidad.</p>
          <div className="flex gap-6">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 hover:text-primary transition-colors"
              suppressHydrationWarning
            >
              {mounted && (
                <Icon name={isDark ? "light_mode" : "dark_mode"} className="text-base" />
              )}
              <span>Cambiar Modo</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
