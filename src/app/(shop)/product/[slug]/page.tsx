import { ProductMobileSlideshow, QuantitySelector, SizeSelector, ProductSlideshow } from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default function ProductSlugPage({ params }: Props) {

  const { slug } = params;
  const product = initialData.products.find(product => product.slug === slug);

  if (!product)
    notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1: md:col-span-2 ">
        {/* Mobile */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />
        {/* Desktop */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className="col-span-1 p-1">
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

