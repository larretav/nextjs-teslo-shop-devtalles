import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces/product.interface";

type Props = {
  params: {
    id: Category
  }
}

let products = initialData.products;

export default function CategoryIdPage({ params }: Props) {

  const { id } = params;

  const labels: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'Unisex'
  }

  if (!labels[id])
    notFound();

  const filteredProducts = products.filter(product => product.gender === id);

  return (
    <div>
      <Title title={`Artículos para ${labels[id]}`} subtitle="" />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}