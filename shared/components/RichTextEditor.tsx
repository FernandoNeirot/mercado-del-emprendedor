"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
      Underline.configure({
        HTMLAttributes: { class: "underline" },
      }),
    ],
    content: value ? (value.startsWith("<") ? value : plainToHtml(value)) : "",
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] px-3 py-2 focus:outline-none text-slate-900 dark:text-white [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_em]:italic [&_u]:underline",
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
    return () => editor.off("update", handler);
  }, [editor, onChange]);

  if (!editor) {
    return (
      <div
        className={`rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 animate-pulse min-h-[100px] ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive("bold")
              ? "bg-primary/20 text-primary dark:bg-emerald-500/20 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
          title="Negrita (Ctrl+B)"
        >
          <Icon name="format_bold" className="text-lg" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive("italic")
              ? "bg-primary/20 text-primary dark:bg-emerald-500/20 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
          title="Cursiva (Ctrl+I)"
        >
          <Icon name="format_italic" className="text-lg" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive("underline")
              ? "bg-primary/20 text-primary dark:bg-emerald-500/20 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
          title="Subrayado (Ctrl+U)"
        >
          <Icon name="format_underlined" className="text-lg" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
