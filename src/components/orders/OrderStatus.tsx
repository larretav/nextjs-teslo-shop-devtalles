import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

type Props = {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {

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