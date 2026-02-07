import {
  getBaseUrl,
  SITE_NAME,
  SITE_DESCRIPTION,
  canonicalUrl,
} from "@/shared/configs/seo";
import type { StoreVendor } from "@/features/tienda/types";
import type { StoreProduct } from "@/features/tienda/types";

/**
 * Organization + WebSite para el sitio completo (usar en layout raíz).
 * https://developers.google.com/search/docs/appearance/structured-data/organization
 * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
export function getDefaultStructuredData(): Record<string, unknown>[] {
  const base = getBaseUrl();
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: base,
      logo: canonicalUrl("/logo-og.png"),
      sameAs: [], // Añadir URLs de redes sociales cuando las tengas: ["https://instagram.com/...", "https://facebook.com/..."]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: base,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      inLanguage: "es-AR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${base}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

function absoluteImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return canonicalUrl(url.startsWith("/") ? url : `/${url}`);
}

/**
 * LocalBusiness + ItemList para la página de una tienda.
 * https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export function getStoreStructuredData(
  store: StoreVendor,
  products: StoreProduct[]
): Record<string, unknown>[] {
  const storeUrl = canonicalUrl(`/tienda/${store.id}`);
  const image = store.bannerUrl || store.logoUrl;

  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: store.name,
    description: store.tagline,
    url: storeUrl,
    ...(image && { image: absoluteImageUrl(image) }),
    ...(store.personalInfo?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: store.personalInfo.address,
        addressLocality: store.personalInfo.city,
        addressRegion: store.personalInfo.state,
        postalCode: store.personalInfo.zip,
        addressCountry: store.personalInfo.country || "AR",
      },
    }),
    ...(store.personalInfo?.phone && { telephone: store.personalInfo.phone }),
    ...(store.personalInfo?.email && { email: store.personalInfo.email }),
    ...(store.personalInfo?.website && { sameAs: [store.personalInfo.website] }),
  };

  const itemList: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Productos de ${store.name}`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: p.imageUrl ? absoluteImageUrl(p.imageUrl) : undefined,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "ARS",
        },
      },
    })),
  };

  return [localBusiness, itemList];
}
