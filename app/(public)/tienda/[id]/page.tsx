import { notFound } from "next/navigation";
import { StoreView, getStoreById, getStoreProducts } from "@/features/tienda";

interface TiendaPageProps {
  params: Promise<{ id: string }>;
}

export default async function TiendaPage({ params }: TiendaPageProps) {
  const { id } = await params;
  const [vendor, products] = await Promise.all([
    getStoreById(id),
    getStoreProducts(id),
  ]);

  if (!vendor) {
    notFound();
  }

  return <StoreView vendor={vendor} products={products} />;
}
