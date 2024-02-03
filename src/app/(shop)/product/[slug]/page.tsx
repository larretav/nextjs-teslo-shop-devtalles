export const revalidate = 604800; // 7 días

import { getProductBySlug } from '@/actions'
import { ProductMobileSlideshow, QuantitySelector, SizeSelector, ProductSlideshow, StockLabel } from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import type { Product } from '@prisma/client';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product)
    notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1: md:col-span-2">
        {/* Mobile */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />
        {/* Desktop */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className="col-span-1 p-1">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        {/* Selector de Tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* Selectod de Cantidad */}
        <QuantitySelector quantity={1} />
        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripción */}
        <h3 className="font-bold text-sm ">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>

    </div>
  )
}

