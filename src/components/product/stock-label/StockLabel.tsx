'use client';
import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts'
import { Product } from '@prisma/client';
import React, { useEffect, useState } from 'react'

type Props = {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [inStock, setInStock] = useState<number>();
  const [isLoading, setIsLoading] = useState(true)

  const getStock = async () => {
    try {
      const inStockDb = await getStockBySlug(slug);

      setInStock(inStockDb);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);

  }

  useEffect(() => {
    getStock()
  }, [])


  return (
    <>
      {
        isLoading
          ? <h1 className={`${titleFont.className} antialiased font-bold text-xl animate-pulse bg-slate-200`}>
            &nbsp;
          </h1>
          : <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            Stock: {inStock}
          </h1>
      }
    </>
  )
}
