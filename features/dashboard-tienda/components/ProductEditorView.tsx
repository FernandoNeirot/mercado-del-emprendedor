"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/shared/components/Icon";
import { RichTextEditor } from "@/shared/components/RichTextEditor";
import type { StoreProduct } from "@/features/tienda";
import type { StoreVendor } from "@/features/tienda";
import { toast } from "sonner";
import {
  updateProduct,
  uploadProductImage,
  createProductWithData,
} from "@/lib/server-actions";

const MAX_IMAGES = 3;
const MAX_SPECS = 10;

/** Normaliza un slug: minúsculas, espacios a guiones, solo letras/números/guiones. */
function sanitizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type SpecItem = { label: string; value: string };

interface ProductEditorViewProps {
  product: StoreProduct | null;
  store: StoreVendor;
  /** Productos de la tienda (solo al crear). Se usa para validar que el slug no exista. */
  storeProducts?: StoreProduct[];
}

export function ProductEditorView({
  product,
  store,
  storeProducts = [],
}: ProductEditorViewProps) {
  const router = useRouter();
  const isCreating = product === null;
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const storeSlugBase = sanitizeSlug(store.slug || store.name);
  const [slug, setSlug] = useState(() => {
    if (!product) return "";
    const full = product.slug || product.id;
    if (!storeSlugBase || !full.endsWith(`-${storeSlugBase}`)) return full;
    return full.slice(0, -(storeSlugBase.length + 1));
  });
  const [price, setPrice] = useState(() =>
    product ? String(product.price) : ""
  );
  const [category, setCategory] = useState(product?.category ?? "");

  const [richDescription, setRichDescription] = useState(
    product?.richDescription ?? ""
  );
  const initialImages = (
    product?.images?.length
      ? product.images
      : product?.imageUrl
        ? [product.imageUrl]
        : []
  ).slice(0, MAX_IMAGES);
  const [imageSlots, setImageSlots] = useState<(string | null)[]>(() =>
    Array.from({ length: MAX_IMAGES }, (_, i) => initialImages[i] ?? null)
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(MAX_IMAGES).fill(null)
  );
  const [specs, setSpecs] = useState<SpecItem[]>(
    () =>
      product != null
        ? (product.specs ?? []).map((s) => ({
          label: s.label ?? "",
          value: s.value ?? "",
        }))
        : [{ label: "", value: "" }]
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

    const richDescValue =
      richDescription.trim() === "" || richDescription.trim() === "<p></p>"
        ? ""
        : richDescription.trim();

    if (isCreating) {
      const priceNum = price.replace(/\D/g, "");
      const priceVal = priceNum ? parseInt(priceNum, 10) : 0;
      if (!name.trim()) {
        toast.error("El nombre es obligatorio.");
        return;
      }
      if (!slug.trim()) {
        toast.error("El slug (URL) es obligatorio.");
        return;
      }
      if (!priceVal || priceVal <= 0) {
        toast.error("El precio es obligatorio y debe ser mayor a 0.");
        return;
      }
      if (!category.trim()) {
        toast.error("La categoría es obligatoria.");
        return;
      }
      if (!richDescValue) {
        toast.error("La descripción es obligatoria.");
        return;
      }
      const hasImage =
        imageFiles.some(
          (f) => f && f instanceof File && f.size > 0
        ) || imageSlots.some(Boolean);
      if (!hasImage) {
        toast.error("Debe agregar al menos una imagen.");
        return;
      }
    } else {
      const hasImage =
        imageFiles.some(
          (f) => f && f instanceof File && f.size > 0
        ) || imageSlots.some(Boolean);
      if (!hasImage) {
        toast.error("Debe agregar al menos una imagen.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const finalImages: string[] = [];
      const productId = product?.id;

      if (isCreating && !productId) {
        const baseSlug = sanitizeSlug(slug) || "";
        const slugExists = storeProducts.some(
          (p) =>
            (p.slug || "").toLowerCase().trim() === baseSlug.toLowerCase().trim()
        );
        if (slugExists) {
          toast.error(
            "Ya existe un producto con ese slug en la tienda. Elegí otro."
          );
          setIsSaving(false);
          return;
        }
        const priceNum = price.replace(/\D/g, "");
        const priceVal = priceNum ? parseInt(priceNum, 10) : 0;
        const validSpecs = specs
          .filter((s) => s.label.trim() || s.value.trim())
          .map((s) => ({ label: s.label.trim(), value: s.value.trim() }));

        const created = await createProductWithData(store.id, {
          name: name.trim(),
          slug: baseSlug,
          price: priceVal,
          category: category.trim(),
          richDescription: richDescValue,
          specs: validSpecs.length > 0 ? validSpecs : undefined,
        });
        if (!created) {
          toast.error("Error al crear el producto");
          return;
        }
        for (let i = 0; i < MAX_IMAGES; i++) {
          const file = imageFiles[i];
          if (file && file instanceof File && file.size > 0) {
            const formData = new FormData();
            formData.append("image", file);
            const result = await uploadProductImage(created.id, formData);
            if (result.success && result.data?.url) {
              finalImages.push(result.data.url);
            }
          }
        }
        await updateProduct(created.id, {
          images: finalImages,
          imageUrl: finalImages[0] ?? "",
        });
        router.refresh();
        router.replace(`/dashboard/tienda/${store.slug}`);
        return;
      }

      if (productId) {
        for (let i = 0; i < MAX_IMAGES; i++) {
          const file = imageFiles[i];
          const existingUrl = imageSlots[i];
          if (file && file instanceof File && file.size > 0) {
            const formData = new FormData();
            formData.append("image", file);
            const result = await uploadProductImage(productId, formData);
            if (result.success && result.data?.url) {
              finalImages.push(result.data.url);
            }
          } else if (existingUrl) {
            finalImages.push(existingUrl);
          }
        }

        const validSpecs = specs
          .filter((s) => s.label.trim() || s.value.trim())
          .map((s) => ({ label: s.label.trim(), value: s.value.trim() }));

        const baseSlug = sanitizeSlug(slug) || product!.id;
        const priceNum = price.replace(/\D/g, "");
        const priceVal = priceNum ? parseInt(priceNum, 10) : 0;

        const updated = await updateProduct(productId, {
          name: name.trim(),
          slug: baseSlug,
          price: priceVal,
          category: category.trim() || "general",
          description: "",
          richDescription: richDescValue,
          images: finalImages,
          imageUrl: finalImages[0] ?? "",
          specs: validSpecs.length > 0 ? validSpecs : undefined,
        });

        if (updated) {
          router.refresh();
          router.push(`/dashboard/tienda/${store.slug}`);
        } else {
          toast.error("Error al guardar el producto");
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      toast.error(msg);
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
              {isCreating ? "Nuevo producto" : "Editar producto"}
            </h1>

            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                  placeholder="Nombre del producto"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Slug (URL) <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  readOnly={!isCreating}
                  className={`w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 font-mono text-sm ${isCreating
                    ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 cursor-not-allowed select-none opacity-75"}`}
                  placeholder="ej. remera-algodon-negra"
                />
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono break-all">
                  {`https://mercadodelemprendedor.com.ar/tienda/${store.slug}/producto/${slug.trim() || "tu-texto"}`}
                </span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Precio (ARS) <span className="text-red-500">*</span>
                  </span>
                  <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                    <span className="flex items-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium">
                      $
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value.replace(/\D/g, ""))
                      }
                      className="flex-1 min-w-0 px-3 py-2 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
                      placeholder="0"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Categoría <span className="text-red-500">*</span>
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

              <div className="block">
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Descripción completa <span className="text-red-500">*</span>
                </span>
                <RichTextEditor
                  value={richDescription}
                  onChange={setRichDescription}
                  placeholder="Descripción del producto..."
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Especificaciones (máx. {MAX_SPECS}) — opcional
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
                  Imágenes (máx. {MAX_IMAGES}) <span className="text-red-500">*</span>
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
              {isSaving ? "Guardando…" : isCreating ? "Crear producto" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
