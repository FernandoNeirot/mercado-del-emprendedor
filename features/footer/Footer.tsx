"use client";

import { Icon } from "@/shared/components/Icon";

export function Footer() {
  return (
    <footer className="md:block bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-16">
      <div className="max-w-7xl mx-auto mb-10 px-4 md:mb-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Icon name="storefront" className="text-sm" />
              </div>
              <p className="font-bold text-xl uppercase tracking-tight">
                Mercado del Emprendedor
              </p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              Conectamos el talento local con personas que valoran lo emprendedor.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                href="#"
              >
                <Icon name="share" />
              </a>
              <a
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                href="#"
              >
                <Icon name="camera_alt" className="text-sm" />
              </a>
            </div>
          </div>
          {/* <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Navegación
            </h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer">
                Explorar Categorías
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Nuestros Emprendedores
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Cómo Contactar
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Preguntas Frecuentes
              </li>
            </ul>
          </div> */}
          {/* <div className="md:col-span-5 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
              Suscribite a las novedades
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Recibí historias de nuevos emprendedores y promociones exclusivas.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-800 transition-colors whitespace-nowrap"
              >
                SUSCRIBIRME
              </button>
            </form>
          </div> */}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 Mercado del Emprendedor. Hecho con ❤️ para la comunidad de emprendedores.</p>
          <div className="flex gap-6">            
            <a className="hover:text-primary transition-colors" href="#">
              Términos
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
