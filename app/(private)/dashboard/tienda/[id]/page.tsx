import { StoreView } from "@/features/tienda";
import { redirect } from "next/navigation";
import { getProductsByStoreId, getStoreById } from "@/lib/server-actions";
import type { Metadata } from "next";
import { JsonLd } from "@/shared/components";
import { getStoreStructuredData } from "@/shared/lib/structured-data";
import { canonicalUrl, ogImageUrl, SITE_NAME } from "@/shared/configs/seo";

interface TiendaPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ buscar?: string }>;
}

export async function generateMetadata({ params }: TiendaPageProps): Promise<Metadata> {
  const { id } = await params;
  const store = await getStoreById(id);
  if (!store) {
    return { title: "Tienda no encontrada" };
  }

  const title = store.name;
  const description = store.tagline || `Tienda ${store.name} en ${SITE_NAME}. ${store.stats?.location || ""}`.trim();
  const url = canonicalUrl(`/tienda/${id}`);
  const image = store?.bannerUrl || store?.logoUrl;
  const imageUrl = image ? ogImageUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: store.name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function TiendaPage({ params, searchParams }: TiendaPageProps) {
  const { id } = await params;
  const { buscar } = await searchParams;
  const store = await getStoreById(id);

  if (!store) {
    return redirect("/");
  }

  const products = await getProductsByStoreId(store.id);

  return (
    <>
      <JsonLd data={getStoreStructuredData(store, products)} />
      <StoreView vendor={store} products={products} searchQuery={buscar} />
    </>
  );
}
