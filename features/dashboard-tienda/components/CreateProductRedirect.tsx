"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createProduct } from "@/lib/server-actions";
import type { StoreVendor } from "@/features/tienda";

interface CreateProductRedirectProps {
  store: StoreVendor;
}

export function CreateProductRedirect({ store }: CreateProductRedirectProps) {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    createProduct(store.id).then((newProduct) => {
      router.refresh();
      if (newProduct) {
        router.replace(`/dashboard/tienda/${store.slug}/producto/${newProduct.id}`);
      } else {
        router.replace(`/dashboard/tienda/${store.slug}`);
      }
    });
  }, [store.id, store.slug, router]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Creando producto…
      </p>
    </div>
  );
}
