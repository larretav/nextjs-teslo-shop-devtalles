
'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";



const OrderSummary = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const { itemsCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());


  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded)
    return <div className="text-xl font-semibold">Cargando...</div>

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <span>No. Productos</span>
        <span className="text-right">{itemsCart === 1 ? '1 artículo' : `${itemsCart} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>
    </>
  )
}

export default OrderSummary