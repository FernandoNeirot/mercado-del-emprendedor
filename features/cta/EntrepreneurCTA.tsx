"use client";

import React from "react";

interface EntrepreneurCTAProps {
  onPublish?: () => void;
  onLearnMore?: () => void;
}

export function EntrepreneurCTA({
  onPublish,
  onLearnMore,
}: EntrepreneurCTAProps) {
  return (
    <section className="relative overflow-hidden mt-8 rounded-2xl md:rounded-[3rem] bg-primary p-6 md:p-12 lg:p-20 text-center md:text-left mb-8">
      <div className="relative z-10 md:max-w-2xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
          ¿Sos emprendedor?
        </h2>
        <p className="text-sm md:text-lg text-emerald-50 mb-6 md:mb-10">
          Sumate a la red más grande de talento local y compartí tu historia con
          una comunidad que valora a los emprendedores.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
          <button
            onClick={onPublish}
            className="px-6 md:px-10 py-3 md:py-4 bg-secondary text-primary font-bold text-sm md:text-lg rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-xl"
          >
            UNIRME A LA COMUNIDAD
          </button>
          <button
            onClick={onLearnMore}
            className="px-6 md:px-10 py-3 md:py-4 bg-transparent border-2 border-white/20 text-white font-bold text-sm md:text-lg rounded-xl md:rounded-2xl hover:bg-white/10 transition-all"
          >
            SABER MÁS
          </button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
}
