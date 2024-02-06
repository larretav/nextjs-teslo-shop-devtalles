'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

type Props = {
  quantity: number,
  onQuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

  // const [count, setCount] = useState(quantity);

  const onValueChanged = (value: number) => () => {
    const newValue = quantity + value;
    if (newValue < 1 || newValue > 10) return;
    // setCount(count + value);
    onQuantityChanged(newValue)
  }

  return (
    <div className="flex ">
      <button onClick={onValueChanged(-1)}>
        <IoRemoveCircleOutline size={25} />
      </button>

      <span className="w-20 mx-2 py-1 bg-gray-200 text-center rounded-md">{quantity}</span>

      <button onClick={onValueChanged(+1)}>
        <IoAddCircleOutline size={25} />
      </button>
    </div>
  )
}
