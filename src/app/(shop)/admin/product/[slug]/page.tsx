import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

type Props = {
  params: {
    slug: string
  }
}

export default async function AdminProductPage({ params }: Props) {

  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // TODO: NEW
  if (!product)
    redirect('/admin/products');

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <>
      <Title title={title} />

      <ProductForm product={product} categories={categories} />
    </>
  );
}
