import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function CartPage() {

  // redirect('/empty')

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title  title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 ">

          {/* Carrito */}
          <div className="flex flex-col mt-5 gap-5">
            <span className="text-xl">Agregar más artículos</span>
            <Link href="/" className="underline mb-5">Continúa comprando</Link>


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
                    <QuantitySelector quantity={4} />
                    <button className="underline">Remover</button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
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
              <Link href="/checkout/address" className="flex btn-primary justify-center">
                Checkout
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>

  );
}