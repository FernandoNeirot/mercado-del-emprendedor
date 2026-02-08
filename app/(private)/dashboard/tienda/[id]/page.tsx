import { StoreEditorView } from "@/features/dashboard-tienda";
import { redirect } from "next/navigation";
import { getProductsByStoreId, getStoreById } from "@/lib/server-actions";
import type { Metadata } from "next";

const SLUG_NUEVA = "nueva";

interface DashboardTiendaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DashboardTiendaPageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === SLUG_NUEVA) {
    return { title: "Nueva tienda | Dashboard" };
  }
  const store = await getStoreById(id);
  if (!store) {
    return { title: "Tienda no encontrada | Dashboard" };
  }
  return { title: `Editar ${store.name} | Dashboard` };
}

export default async function DashboardTiendaPage({
  params,
}: DashboardTiendaPageProps) {
  const { id } = await params;

  if (id === SLUG_NUEVA) {
    return (
      <StoreEditorView
        store={null}
        products={[]}
        currentSlug={SLUG_NUEVA}
      />
    );
  }

  const store = await getStoreById(id);
  if (!store) {
    redirect("/dashboard/tienda/nueva");
  }

  const products = await getProductsByStoreId(store.id);

  return (
    <StoreEditorView
      store={store}
      products={products}
      currentSlug={store.slug}
    />
  );
}
