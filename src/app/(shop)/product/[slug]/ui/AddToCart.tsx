'use client';

import { QuantitySelector, SizeSelector } from '@/components'
import { Product } from '@/interfaces'
import { CartProduct, Size } from '@/interfaces/product.interface';
import { useCartStore } from '@/store';
import React, { useState } from 'react'

type Props = {
  product: Product
}

export const AddToCart = ({ product }: Props) => {

  const productToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const onClickAddToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug ,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    }

    productToCart(cartProduct);
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  }


  return (
    <>
      
      {posted && !size && <span className="mt-2 text-red-500 fade-in">Debe de selecionar una talla</span>}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />


      {/* Selectod de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Button */}
      <button className="btn-primary my-5" onClick={onClickAddToCart}>
        Agregar al carrito
      </button>
    </>
  )
}
