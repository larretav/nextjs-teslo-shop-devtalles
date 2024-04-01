'use client';
import { PayPalButtons, usePayPalScriptReducer, } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import { setTransactionId } from "@/actions";

type Props = {
  orderId: string,
  amount: number
}

export const PayPalButton = ({ amount, orderId }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100)) / 100

  if (isPending)
    return <>
      <div className="animate-pulse">
        <div className="h-11 mb-3 bg-slate-200 rounded-md" />
        <div className="h-11 mb-3 bg-slate-200 rounded-md" />
      </div>
    </>


  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: `${roundedAmount}`
          }
        }
      ]
    })

    const resp = await setTransactionId(orderId, transactionId);

    if (!resp.ok) throw new Error(resp.message)

    console.log({ transactionId })

    return transactionId
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
    // onApprove={ }
    />
  )
}
