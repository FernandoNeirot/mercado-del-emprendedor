"use client";

import React from "react";
import type { StoreFormState } from "../types";

interface StoreEditorTabHistoriaProps {
  form: StoreFormState;
  onChange: (updates: Partial<StoreFormState>) => void;
}

export function StoreEditorTabHistoria({ form, onChange }: StoreEditorTabHistoriaProps) {
  const story = form.story ?? { founderName: "", paragraphs: [""] };

  const setFounderName = (founderName: string) =>
    onChange({ story: { ...story, founderName } });

  const setParagraph = (index: number, value: string) => {
    const paragraphs = [...(story.paragraphs ?? [""])];
    paragraphs[index] = value;
    onChange({ story: { ...story, paragraphs } });
  };

  const addParagraph = () =>
    onChange({
      story: {
        ...story,
        paragraphs: [...(story.paragraphs ?? [""]), ""],
      },
    });

  const removeParagraph = (index: number) => {
    const paragraphs = (story.paragraphs ?? [""]).filter((_, i) => i !== index);
    onChange({ story: { ...story, paragraphs: paragraphs.length ? paragraphs : [""] } });
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Mi Historia
      </h2>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
          Nombre del fundador
        </span>
        <input
          type="text"
          value={story.founderName ?? ""}
          onChange={(e) => setFounderName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
          placeholder="Tu nombre"
        />
      </label>

      <div className="space-y-3">
        <span className="block text-sm font-medium text-slate-600 dark:text-slate-400">
          Párrafos
        </span>
        {(story.paragraphs ?? [""]).map((p, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={p}
              onChange={(e) => setParagraph(i, e.target.value)}
              rows={3}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder={`Párrafo ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeParagraph(i)}
              className="p-2 text-slate-500 hover:text-red-600 shrink-0"
              aria-label="Quitar párrafo"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addParagraph}
          className="text-sm text-primary dark:text-emerald-400 hover:underline"
        >
          + Agregar párrafo
        </button>
      </div>
    </section>
  );
}
