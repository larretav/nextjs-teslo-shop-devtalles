'use client';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeople, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

type Props = {}

export const Sidebar = (props: Props) => {

  const open = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>

      {/* Background black */}
      {
        open && <div
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
        />
      }


      {/* Blur */}
      {
        open && <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      }


      {/* Sidemenu */}
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !open
            }
          )
        }
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input type="text" placeholder="Buscar..." className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 hover:border-gray-400 focus:outline-none focus:border-blue-500 transition-all" />
        </div>

        {/* Menu */}
        <Link
          href="/profile"
          onClick={closeMenu}
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="text-xl">Perfil</span>
        </Link>

        <Link
          href="/auth/login"
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="text-xl">Ingresar</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="text-xl">Salir</span>
        </Link>

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/"
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="text-xl">Productos</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="text-xl">Usuarios</span>
        </Link>

      </nav>


    </div>
  )
}