"use client";

import React, { useState } from "react";
import { Icon } from "@/shared/components/Icon";

export interface LocationData {
  provincia: string;
  localidades: string[];
}

interface LocationSelectorProps {
  locations: LocationData[];
  defaultProvincia?: string;
  defaultLocalidad?: string;
  onLocationChange?: (provincia: string, localidad: string) => void;
  className?: string;
  variant?: "button" | "dropdown";
}

export function LocationSelector({
  locations,
  defaultProvincia,
  defaultLocalidad,
  onLocationChange,
  className = "",
  variant = "button",
}: LocationSelectorProps) {
  const [selectedProvincia, setSelectedProvincia] = useState<string>(
    defaultProvincia || locations[0]?.provincia || ""
  );
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>(
    defaultLocalidad || locations[0]?.localidades[0] || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isProvinciaOpen, setIsProvinciaOpen] = useState(false);
  const [isLocalidadOpen, setIsLocalidadOpen] = useState(false);

  const currentLocalidades =
    locations.find((loc) => loc.provincia === selectedProvincia)
      ?.localidades || [];

  // Función helper para actualizar provincia y localidad
  const handleProvinciaChange = (newProvincia: string) => {
    const provinciaData = locations.find(
      (loc) => loc.provincia === newProvincia
    );
    
    setSelectedProvincia(newProvincia);
    
    if (provinciaData && provinciaData.localidades.length > 0) {
      const newLocalidad =
        provinciaData.localidades.includes(selectedLocalidad)
          ? selectedLocalidad
          : provinciaData.localidades[0];
      setSelectedLocalidad(newLocalidad);
      onLocationChange?.(newProvincia, newLocalidad);
    }
  };

  // Función helper para actualizar localidad
  const handleLocalidadChange = (newLocalidad: string) => {
    setSelectedLocalidad(newLocalidad);
    onLocationChange?.(selectedProvincia, newLocalidad);
  };

  if (variant === "button") {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full min-[360px]:w-auto items-center gap-2 px-3 lg:px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
        >
          <Icon
            name="location_on"
            className="text-primary text-base lg:text-lg"
          />
          <div className="flex w-full items-center justify-between">
            <span className="text-[10px] lg:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              {selectedProvincia}:{" "}
              <span className="text-slate-900 dark:text-white">
                {selectedLocalidad}
              </span>
            </span>
            <Icon
              name="expand_more"
              className={`text-slate-400 text-xs lg:text-sm transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 min-w-[280px] p-4 space-y-4">
              {/* Selector de Provincia */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Provincia
                </label>
                <button
                  onClick={() => setIsProvinciaOpen(!isProvinciaOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <span>{selectedProvincia}</span>
                  <Icon
                    name="expand_more"
                    className={`text-slate-400 transition-transform ${
                      isProvinciaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isProvinciaOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto z-30">
                    {locations.map((location) => (
                      <button
                        key={location.provincia}
                        onClick={() => {
                          handleProvinciaChange(location.provincia);
                          setIsProvinciaOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          selectedProvincia === location.provincia
                            ? "bg-primary/10 text-primary dark:text-emerald-400 font-semibold"
                            : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {location.provincia}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector de Localidad */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Localidad
                </label>
                <button
                  onClick={() => setIsLocalidadOpen(!isLocalidadOpen)}
                  disabled={currentLocalidades.length === 0}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{selectedLocalidad || "Selecciona una localidad"}</span>
                  <Icon
                    name="expand_more"
                    className={`text-slate-400 transition-transform ${
                      isLocalidadOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLocalidadOpen && currentLocalidades.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto z-30">
                    {currentLocalidades.map((localidad) => (
                      <button
                        key={localidad}
                        onClick={() => {
                          handleLocalidadChange(localidad);
                          setIsLocalidadOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          selectedLocalidad === localidad
                            ? "bg-primary/10 text-primary dark:text-emerald-400 font-semibold"
                            : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {localidad}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Variant "dropdown" - dos dropdowns separados
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* Selector de Provincia */}
      <div className="relative flex-1">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
          Provincia
        </label>
        <button
          onClick={() => setIsProvinciaOpen(!isProvinciaOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
        >
          <span>{selectedProvincia}</span>
          <Icon
            name="expand_more"
            className={`text-slate-400 transition-transform ${
              isProvinciaOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isProvinciaOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsProvinciaOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto z-20">
              {locations.map((location) => (
                <button
                  key={location.provincia}
                  onClick={() => {
                    handleProvinciaChange(location.provincia);
                    setIsProvinciaOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    selectedProvincia === location.provincia
                      ? "bg-primary/10 text-primary dark:text-emerald-400 font-semibold"
                      : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {location.provincia}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Selector de Localidad */}
      <div className="relative flex-1">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
          Localidad
        </label>
        <button
          onClick={() => setIsLocalidadOpen(!isLocalidadOpen)}
          disabled={currentLocalidades.length === 0}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{selectedLocalidad || "Selecciona una localidad"}</span>
          <Icon
            name="expand_more"
            className={`text-slate-400 transition-transform ${
              isLocalidadOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isLocalidadOpen && currentLocalidades.length > 0 && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsLocalidadOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto z-20">
              {currentLocalidades.map((localidad) => (
                <button
                  key={localidad}
                  onClick={() => {
                    handleLocalidadChange(localidad);
                    setIsLocalidadOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    selectedLocalidad === localidad
                      ? "bg-primary/10 text-primary dark:text-emerald-400 font-semibold"
                      : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {localidad}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
