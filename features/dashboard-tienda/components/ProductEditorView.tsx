"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/shared/components/Icon";
import { RichTextEditor } from "@/shared/components/RichTextEditor";
import type { StoreProduct } from "@/features/tienda";
import type { StoreVendor } from "@/features/tienda";
import { updateProduct } from "@/lib/server-actions";

const MAX_IMAGES = 3;
const MAX_SPECS = 10;

type SpecItem = { label: string; value: string };

interface ProductEditorViewProps {
  product: StoreProduct;
  store: StoreVendor;
}

export function ProductEditorView({ product, store }: ProductEditorViewProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description ?? "");
  const [richDescription, setRichDescription] = useState(
    product.richDescription ?? ""
  );
  const initialImages = (
    product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : []
  ).slice(0, MAX_IMAGES);
  const [imageSlots, setImageSlots] = useState<(string | null)[]>(() =>
    Array.from({ length: MAX_IMAGES }, (_, i) => initialImages[i] ?? null)
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(MAX_IMAGES).fill(null)
  );
  const [specs, setSpecs] = useState<SpecItem[]>(
    () =>
      (product.specs ?? []).map((s) => ({
        label: s.label ?? "",
        value: s.value ?? "",
      }))
  );

  const addSpec = () => {
    if (specs.length >= MAX_SPECS) return;
    setSpecs((prev) => [...prev, { label: "", value: "" }]);
  };

  const updateSpec = (index: number, field: "label" | "value", val: string) => {
    setSpecs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const removeSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, file: File | null) => {
    setImageFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const removeImage = (index: number) => {
    setImageSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setImageFiles((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      const finalImages: string[] = [];

      for (let i = 0; i < MAX_IMAGES; i++) {
        const file = imageFiles[i];
        const existingUrl = imageSlots[i];
        if (file && file instanceof File && file.size > 0) {
          const formData = new FormData();
          formData.append("image", file);
          const baseUrl =
            typeof window !== "undefined"
              ? window.location.origin
              : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
          const res = await fetch(
            `${baseUrl}/api/products/${product.id}/images?folder=products/${product.id}`,
            { method: "POST", body: formData }
          );
          const json = await res.json();
          if (json.success && json.data?.url) {
            finalImages.push(json.data.url);
          }
        } else if (existingUrl) {
          finalImages.push(existingUrl);
        }
      }

      const validSpecs = specs
        .filter((s) => s.label.trim() || s.value.trim())
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() }));

      const productIdentifier = product.slug || product.id;
      const updated = await updateProduct(productIdentifier, {
        name: name.trim(),
        price: parseFloat(price) || 0,
        category: category.trim() || "general",
        description: description.trim(),
        richDescription: richDescription.trim() || undefined,
        images: finalImages,
        imageUrl: finalImages[0] ?? "",
        specs: validSpecs.length > 0 ? validSpecs : undefined,
      });

      if (updated) {
        router.refresh();
        router.push(`/dashboard/tienda/${store.slug}`);
      } else {
        alert("Error al guardar el producto");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      alert(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20 md:pb-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/dashboard/tienda/${store.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
        >
          <Icon name="arrow_back" className="text-lg" />
          Volver a {store.name}
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Editar producto
            </h1>

            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nombre
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                  placeholder="Nombre del producto"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Precio (ARS)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Categoría
                  </span>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                    placeholder="ej. Indumentaria"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Descripción corta
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                  placeholder="Breve descripción"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Descripción detallada (HTML)
                </span>
                <RichTextEditor
                  value={richDescription}
                  onChange={setRichDescription}
                  placeholder="Descripción enriquecida del producto..."
                />
              </label>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Especificaciones (máx. {MAX_SPECS})
                </span>
                <div className="space-y-3">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) =>
                          updateSpec(i, "label", e.target.value)
                        }
                        placeholder="Ej. Material"
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpec(i, "value", e.target.value)
                        }
                        placeholder="Ej. 100% Algodón"
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(i)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Quitar"
                      >
                        <Icon name="close" className="text-lg" />
                      </button>
                    </div>
                  ))}
                  {specs.length < MAX_SPECS && (
                    <button
                      type="button"
                      onClick={addSpec}
                      className="flex items-center gap-2 text-sm font-medium text-primary dark:text-emerald-400 hover:underline"
                    >
                      <Icon name="add" className="text-lg" />
                      Agregar especificación
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Imágenes (máx. {MAX_IMAGES})
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: MAX_IMAGES }).map((_, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
                    >
                      {imageSlots[i] || imageFiles[i] ? (
                        <>
                          <div className="absolute inset-0">
                            {imageFiles[i] ? (
                              <img
                                src={URL.createObjectURL(imageFiles[i]!)}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={imageSlots[i]!}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 p-1.5 rounded-full bg-red-500/90 text-white hover:bg-red-500"
                            aria-label="Quitar imagen"
                          >
                            <Icon name="close" className="text-sm" />
                          </button>
                        </>
                      ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          <Icon name="add_photo_alternate" className="text-3xl" />
                          <span className="text-xs">Agregar</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) =>
                              handleImageChange(i, e.target.files?.[0] ?? null)
                            }
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href={`/dashboard/tienda/${store.slug}`}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold disabled:opacity-50"
            >
              {isSaving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
