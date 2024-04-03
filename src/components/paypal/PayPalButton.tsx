'use client';
import { PayPalButtons, usePayPalScriptReducer, } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from "@/actions";

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
          invoice_id: orderId,
          amount: {
            currency_code: 'MXN',
            value: `${roundedAmount}`
          }
        }
      ]
    })

    const resp = await setTransactionId(orderId, transactionId);

    if (!resp.ok) throw new Error(resp.message)

    // console.log({ transactionId })

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details?.id) return;

    // Server Action
    await paypalCheckPayment(details.id)

  }

  return (
    <div className="relative z-0">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
