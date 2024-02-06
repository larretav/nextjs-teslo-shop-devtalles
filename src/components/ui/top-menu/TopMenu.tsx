'use client';
import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { MiniCart } from "./MiniCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {}

export const TopMenu = (props: Props) => {

  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const miniCartToggle = useUIStore((state) => state.miniCartToggle)
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const { push } = useRouter()
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClickCart = () => {

    if (totalItemsInCart === 0) {
      push('/empty');
      return
    }

    miniCartToggle()
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])


  return (
    <nav className="px-5 box-border flex justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link
          href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/gender/men">Hombres</Link>
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/gender/women">Mujeres</Link>
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/gender/kid">Niños</Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <div onClick={handleClickCart} className="relative cursor-pointer">
          {
            (isLoaded && totalItemsInCart > 0) && <span className="px-1 absolute text-xs rounded-full font-bold -top-2 -right-2 bg-blue-500 text-white">
              {totalItemsInCart}
            </span>
          }

          <IoCartOutline className="w-5 h-5" />
          <MiniCart />
        </div>

        <button
          onClick={openSideMenu}
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>


    </nav>
  )
}
