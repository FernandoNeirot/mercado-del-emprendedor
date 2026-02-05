import { StoreVendor, StoreView} from "@/features/tienda";

interface TiendaPageProps {
  params: Promise<{ id: string }>;
}

export default async function TiendaPage({ params }: TiendaPageProps) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  const store = data.data as StoreVendor;
  return <StoreView vendor={store} products={[]} />;
}
