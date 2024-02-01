import Link from "next/link";
import { IoCartOutline } from "react-icons/io5"

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">Tu carrito esta vacío</h1>
        <Link href="/" className="text-blue-500 text-4xl">
          Regresar
        </Link>
      </div>
    </div>
  );
}