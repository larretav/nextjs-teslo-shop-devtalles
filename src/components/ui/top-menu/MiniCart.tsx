'use client';
import Image from 'next/image';

import { initialData } from '@/seed/seed';
import Link from 'next/link';
import { useCartStore, useUIStore } from '@/store';
import clsx from 'clsx';
import { ProductImage } from '@/components';

// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

export const MiniCart = () => {

  const isMiniCartOpen = useUIStore((state) => state.isMiniCartOpen)
  const productsInCart = useCartStore(state => state.cart);
  const subTotal = productsInCart.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);

  return (
    <div
      className={
      clsx(
        "absolute w-[300px] right-0 z-20 bg-white rounded-xl shadow-xl p-5 text-xs transition-all fade-in",
        {
          'hidden': !isMiniCartOpen
        }
      )
    }>
      {
        productsInCart.map((product, idx) => (
          <div key={idx + product.slug + product.quantity} className="flex mb-2">
            <ProductImage
              src={product.image}
              width={50}
              height={50}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <p>{product.title}</p>
              <p>{product.quantity} x ${product.price}</p>
            </div>
          </div>
        ))
      }
      <div className="grid grid-cols-2 mb-5">


        <span className="mt-5 font-bold">Sub Total</span>
        <span className="mt-5 font-bold text-right">$ {subTotal}</span>

      </div>
      <Link href="/cart" className="flex btn-primary justify-center">
        Ver Carrito
      </Link>
    </div>
  )
}