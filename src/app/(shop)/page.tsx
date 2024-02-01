import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products} = await getPaginatedProductsWithImages({});

  return (
    <div className="p-1">
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
    </div>
  );
}
