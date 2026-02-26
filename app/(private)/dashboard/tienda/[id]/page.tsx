import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { StoreEditorView } from "@/features/dashboard-tienda";
import { queryKeys } from "@/lib/query-keys";
import { getServerQueryClient } from "@/lib/query-client";
import { getProductsByStoreId, getStoreById } from "@/lib/server-actions";
import { redirect } from "next/navigation";
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

  const queryClient = getServerQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.store(id),
    queryFn: () => getStoreById(id),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products(store.id),
    queryFn: () => getProductsByStoreId(store.id),
  });
  const products =
    queryClient.getQueryData<Awaited<ReturnType<typeof getProductsByStoreId>>>(
      queryKeys.products(store.id)
    ) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoreEditorView
        store={store}
        products={products}
        currentSlug={store.slug}
      />
    </HydrationBoundary>
  );
}
