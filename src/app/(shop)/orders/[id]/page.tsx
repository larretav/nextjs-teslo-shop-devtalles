import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

type Props = {
  params: {
    id: string
  }
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function OrdersIdPage({ params }: Props) {

  const { id } = params;
  // TODO: Verificar auth
  // redirect

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 ">

          {/* Carrito */}
          <div className="flex flex-col mt-5 gap-5">
            <div className={
              clsx(
                "flex items-center rounded-lg  py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-600': true,
                }
              )
            }>
              <IoCardOutline size={25} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2 text-sm">Pagada</span>
            </div>


            {/* Items */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex gap-2">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    alt={product.title}
                    className="rounded-lg max-h-[100px]"
                  />

                  <div className="flex flex-col items-start gap-1">
                    <p>{product.title}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <p>${product.price.toFixed(2)} x 4</p>
                    <p className="font-bold">Subtotal: $460.00</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">

            <h2 className="text-2xl font-bold mb-2">Resumen de la orden</h2>
            <div className="mb-10">
              <p className="text-xl">Alejandro Larreta Vzla</p>
              <p>c. bosque de abetos 2063A</p>
              <p>col. Jardines del Bosque</p>
              <p>Los Mochis, Sin. 81200</p>
              <p>6681342524</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px rounded bg-gray-200 mb-10 " />

            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2 gap-1">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100.00</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$50.00</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100.00</span>
            </div>

            <div className="mt-5 w-full">
              <div className={
                clsx(
                  "flex items-center rounded-lg  py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': false,
                    'bg-green-600': true,
                  }
                )
              }>
                <IoCardOutline size={25} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2 text-sm">Pagada</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  );
}