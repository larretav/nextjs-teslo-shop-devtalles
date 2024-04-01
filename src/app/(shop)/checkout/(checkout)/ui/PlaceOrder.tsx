'use client';

import { placeOrder } from "@/actions";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlaceOrder = () => {

  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddressStore(state => state.address);
  const { itemsCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);


  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    //! Server action
    const resp = await placeOrder(productsToOrder, address)
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    //* Todo salió bien!
    clearCart();
    router.replace('/orders/' + resp.order?.id)


  }


  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <span className="text-4xl">Cargando...</span>


  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

      <h2 className="text-2xl font-bold mb-2">Resumen de la orden</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px rounded bg-gray-200 mb-10 " />

      <h2 className="text-2xl mb-2">Resumen de la orden</h2>
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

      <div className="mt-5 w-full">
        {/* Declaimer */}
        <span className="text-xs">
          Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
        </span>

        <span className="mt-2 block text-red-500 transition-all">{errorMessage}</span>

        <button
          onClick={onPlaceOrder}
          className={clsx(
            'flex w-full justify-center mt-7',
            {
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            },
          )
          }>
          Colocar orden
        </button>

      </div>
    </div>
  )
}

export default PlaceOrder