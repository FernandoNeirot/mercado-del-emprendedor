import { ProductEditorView } from "@/features/dashboard-tienda";
import {
  getProductById,
  getProductsByStoreId,
  getStoreById,
} from "@/lib/server-actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

const SLUG_NUEVO = "nuevo";

interface ProductoEditorPageProps {
  params: Promise<{ id: string; productId: string }>;
}

export async function generateMetadata({
  params,
}: ProductoEditorPageProps): Promise<Metadata> {
  const { productId } = await params;
  if (productId === SLUG_NUEVO) {
    return { title: "Nuevo producto | Dashboard" };
  }
  const product = await getProductById(productId);
  if (!product) return { title: "Producto no encontrado | Dashboard" };
  return { title: `Editar ${product.name} | Dashboard` };
}

export default async function ProductoEditorPage({
  params,
}: ProductoEditorPageProps) {
  const { id: storeIdOrSlug, productId } = await params;

  const store = await getStoreById(storeIdOrSlug);
  if (!store) {
    redirect("/dashboard");
  }

  if (productId === SLUG_NUEVO) {
    const products = await getProductsByStoreId(store.id);
    return (
      <ProductEditorView product={null} store={store} storeProducts={products} />
    );
  }

  const product = await getProductById(productId);
  if (!product) {
    redirect(`/dashboard/tienda/${store.slug}`);
  }

  const productBelongsToStore =
    product.storeId === store.id || product.storeId === store.slug;
  if (!productBelongsToStore) {
    redirect(`/dashboard/tienda/${store.slug}`);
  }

  return <ProductEditorView product={product} store={store} />;
}
