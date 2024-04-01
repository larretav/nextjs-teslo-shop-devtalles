import { getOrderById } from "@/actions";
import { PayPalButton, QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

type Props = {
  params: {
    id: string
  }
}


export default async function OrdersByIdPage({ params }: Props) {

  const { id } = params;

  //! Llamar el server action
  const { order } = await getOrderById(id);

  if (!order) return <span className="text-2xl">La orden no existe</span>

  const { OrderAddress: address, OrderItem: orderItem, user, ...restOrder } = order;

  // TODO: Verificar auth 
  // redirect

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 ">

          {/* Carrito */}
          <div className="flex flex-col mt-5 gap-5">
            <IsPaidAlert isPaid={restOrder.isPaid} />

            {/* Items */}
            {
              orderItem.map((item, idx) => (
                <div key={idx + item.product.slug} className="flex gap-2">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className="rounded-lg max-h-[100px]"
                  />

                  <div className="flex flex-col items-start gap-1">
                    <p>({item.size}) - {item.product.title}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl font-semibold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{user.name}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.city}, {address?.country.name} {address?.postalCode} </p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px rounded bg-gray-200 mb-10 " />

            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2 gap-1">
              <span>No. Productos</span>
              <span className="text-right">{restOrder.itemsInOrder} artículos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(restOrder.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(restOrder.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(restOrder.total)}</span>
            </div>

            {/* <IsPaidAlert isPaid={restOrder.isPaid} /> */}
            <PayPalButton orderId={order.id} amount={order.total} />

          </div>

        </div>
      </div>
    </div>

  );
}

const IsPaidAlert = ({ isPaid }: { isPaid: boolean }) => {

  return <div className="mt-5 w-full">
    <div className={
      clsx(
        "flex items-center rounded-lg  py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          'bg-red-500': !isPaid,
          'bg-green-600': isPaid,
        }
      )
    }>
      <IoCardOutline size={25} />
      <span className="mx-2 text-sm">{isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
    </div>

  </div>
}