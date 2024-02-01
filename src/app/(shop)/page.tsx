import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {


  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 12 });

  console.log(totalPages)
  if (products.length == 0)
    redirect('/')

  return (
    <div className="p-1">
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={10} />
    </div>
  );
}
