"use client";

import React from "react";

interface EntrepreneurCTAProps {
  onPublish?: () => void;
}

export function EntrepreneurCTA({ onPublish }: EntrepreneurCTAProps) {
  return (
    <section className="px-5 md:px-0 mt-12 md:mt-0 mb-8 md:mb-16">
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[2.5rem] bg-[#0A1428] p-8 md:p-10 md:p-16 text-center md:text-left">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 left-1/2 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 md:max-w-xl">
          <h2 className="text-white text-xl md:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
            ¿Sos emprendedor?
          </h2>
          <p className="text-white/60 text-xs md:text-lg mb-6 md:mb-8 max-w-[200px] md:max-w-none text-slate-400">
            Sumate a la red más grande de talento local y empezá a vender hoy mismo.
          </p>
          <button
            onClick={onPublish}
            className="inline-flex items-center justify-center bg-secondary md:bg-secondary text-primary px-6 md:px-10 py-3 md:py-4 rounded-2xl font-black md:font-bold text-xs md:text-lg uppercase tracking-wider shadow-xl md:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            PUBLICAR GRATIS
          </button>
        </div>
      </div>
    </section>
  );
}
