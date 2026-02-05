import { Header } from "@/features/header";
import { StoreView } from "@/features/tienda";
import { redirect } from "next/navigation";
import { getProductsByStoreId, getStoreById } from "./serverAction";

interface TiendaPageProps {
  params: Promise<{ id: string }>;
}

export default async function TiendaPage({ params }: TiendaPageProps) {
  const { id } = await params;

  const store = await getStoreById(id);
  if (!store) {
    return redirect("/");
  }

  const products = await getProductsByStoreId(store.id);
  
  return (
    <>
      <Header />
      <StoreView vendor={store} products={products} />
    </>
  );
}
