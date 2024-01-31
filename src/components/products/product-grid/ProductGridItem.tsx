'use client';

import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

type Props = {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {

  const [dispayImage, setDispayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${dispayImage}`}
          alt={product.title}
          width={500}
          height={500}
          className="w-full object-cover rounded-lg"
          onMouseEnter={() => setDispayImage(product.images[1])}
          onMouseLeave={() => setDispayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-500"
        >
          {product.title}
        </Link>
      </div>

    </div>
  )
}
