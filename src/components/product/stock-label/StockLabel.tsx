'use client';
import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts'
import { Product } from '@prisma/client';
import React, { useEffect, useState } from 'react'

type Props = {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [product, setProduct] = useState<Product | null>();

  const getStock = async() => {
    try {
      const productDb = await getStockBySlug(slug);

      setProduct(productDb);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStock()
  }, [])
  

  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {product?.inStock || 'Cargando...'}
    </h1>
  )
}
