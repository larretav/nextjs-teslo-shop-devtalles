'use client';

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {}

export const ProductsInCart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const productsInCart = useCartStore(state => state.cart);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded)
    return <div className="font-xl font-semibold">Cargando...</div>


  return (
    <>
      {/* Items */}
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex gap-2">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              alt={product.title}
              className="rounded-lg max-h-[100px]"
            />

            <div className="flex flex-col items-start gap-1">
              <span>{product.size} - {product.title} (x {product.quantity})</span>
              <p>{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
