'use client';
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

type Props = {}

export const TopMenu = (props: Props) => {

  const openSideMenu = useUIStore((state)=> state.openSideMenu)

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
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/category/men">Hombres</Link>
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/category/women">Mujeres</Link>
        <Link className="px-2 py-1 rounded-md transition-all hover:bg-slate-100" href="/category/kids">Niños</Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/search">
          <div className="relative">
            <span className="px-1 absolute text-xs rounded-full font-bold -top-2 -right-2 bg-blue-500 text-white">
              5
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={()=> openSideMenu()}
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>

    </nav>
  )
}
