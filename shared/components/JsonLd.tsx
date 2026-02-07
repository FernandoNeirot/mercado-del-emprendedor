/** Objeto o array de objetos JSON-LD (Organization, WebSite, LocalBusiness, etc.). */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Inyecta JSON-LD en el head para SEO. Acepta un objeto o array de objetos (múltiples scripts).
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
