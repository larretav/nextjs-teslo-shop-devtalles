export const revalidate = 60; // 60 segundos

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { getPaginatedProductsWithImages } from "@/actions";

type Props = {
  params: {
    gender: Gender
  },
  searchParams: {
    page?: string
  }
}


export default async function CategoryIdPage({ params, searchParams }: Props) {

  const { gender } = params;

  const labels: Record<Gender, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'unisex'
  }

  if (!labels[gender])
    notFound();

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 10, gender });
  if (products.length === 0)
    redirect(`/gender/${gender}`)

  // const filteredProducts = products.filter(product => product.gender === gender);

  return (
    <div>
      <Title title={`Artículos ${labels[gender]}`} subtitle="" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}