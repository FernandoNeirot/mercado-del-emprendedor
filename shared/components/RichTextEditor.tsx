"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Icon } from "./Icon";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

/** Convierte texto plano en HTML simple para mostrar en Tiptap. */
function plainToHtml(text: string): string {
  if (!text.trim()) return "";
  return text
    .split("\n")
    .map((line) => `<p>${line || "<br>"}</p>`)
    .join("");
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Escribí aquí…",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: { HTMLAttributes: { class: "mb-2 last:mb-0" } },
      }),
      TextStyle,
      FontSize,
      Underline.configure({
        HTMLAttributes: { class: "underline" },
      }),
    ],
    content: value ? (value.startsWith("<") ? value : plainToHtml(value)) : "",
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] px-3 py-2 focus:outline-none text-slate-900 dark:text-white [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_em]:italic [&_u]:underline select-text cursor-text touch-manipulation",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, onChange]);

  if (!editor) {
    return (
      <div
        className={`rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 animate-pulse min-h-[100px] ${className}`}
      />
    );
  }

  const toolbarButtonClass =
    "p-2 rounded transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-slate-200";

  const FONT_SIZES = [
    { label: "Pequeño", value: "12px" },
    { label: "Normal", value: "14px" },
    { label: "Grande", value: "18px" },
    { label: "Título", value: "24px" },
  ] as const;

  return (
    <div
      className={`rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 ${className}`}
    >
      <div
        className="flex items-center gap-0.5 border-b border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/80 px-2 py-1.5"
        role="toolbar"
        aria-label="Formato de texto"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          onMouseDown={(e) => e.preventDefault()}
          className={toolbarButtonClass}
          title="Negrita (Ctrl+B)"
        >
          <Icon name="format_bold" className="text-lg" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          onMouseDown={(e) => e.preventDefault()}
          className={toolbarButtonClass}
          title="Cursiva (Ctrl+I)"
        >
          <Icon name="format_italic" className="text-lg" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          onMouseDown={(e) => e.preventDefault()}
          className={toolbarButtonClass}
          title="Subrayado (Ctrl+U)"
        >
          <Icon name="format_underlined" className="text-lg" />
        </button>
        <select
          onChange={(e) => {
            const size = e.target.value;
            if (size) {
              editor.chain().focus().setFontSize(size).run();
              e.target.value = "";
            }
          }}
          defaultValue=""
          className={`${toolbarButtonClass} py-2 px-2 text-sm cursor-pointer border-0 bg-transparent min-w-[100px]`}
          title="Tamaño de texto"
        >
          <option value="">Tamaño</option>
          {FONT_SIZES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="min-h-[80px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:select-text [&_.ProseMirror]:touch-manipulation [&_.ProseMirror]:min-h-[80px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
