export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 6 });

  if (products.length == 0)
    redirect('/')

  return (
    <div className="p-1">
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products}  />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
