/** Ensures the base URL has a scheme (https://) for use with new URL() and metadata. */
function ensureUrlWithScheme(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const SITE_NAME = "Mercado Emprendedor";
export const SITE_DESCRIPTION =
  "La red más grande de talento local. Descubrí emprendedores, tiendas y productos cerca tuyo.";
export const SITE_KEYWORDS = [
  "mercado emprendedor",
  "emprendedores",
  "tiendas locales",
  "comprar local",
  "productos artesanales",
  "negocios locales",
  "comercio local",
];
export const LOCALE = "es_AR";
export const TWITTER_HANDLE = "@MercadoEmprendedor";

export function getBaseUrl(): string {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_URL) {
    return ensureUrlWithScheme(process.env.NEXT_PUBLIC_BASE_URL);
  }
  return ensureUrlWithScheme(BASE_URL);
}

export function canonicalUrl(path: string): string {
  const base = getBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Imagen por defecto para Open Graph (1200x630 recomendado). Debe ser URL absoluta. */
export const DEFAULT_OG_IMAGE = "/og-default.png";

export function ogImageUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return canonicalUrl(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}
