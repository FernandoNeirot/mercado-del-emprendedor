import { notFound } from "next/navigation";
import { getProductById, getStoreById } from "@/lib/server-actions";
import { ProductView } from "@/features/tienda";
import type { Metadata } from "next";
import { SITE_NAME } from "@/shared/configs/seo";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  console.log("id", id);
  const product = await getProductById(id);
  console.log("product", product);
  if (!product) return { title: "Producto no encontrado" };

  const store = await getStoreById(product.storeId);
  console.log("store", store);
  const storeName = store?.name ?? "Tienda";

  const title = `${product.name} | ${storeName}`;
  const description =
    product.description?.slice(0, 160) ||
    `Comprar ${product.name} en ${storeName} - ${SITE_NAME}`;

  return {
    title,
    description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const store = await getStoreById(product.storeId);

  if (!store) {
    notFound();
  }

  return <ProductView product={product} vendor={store} />;
}
