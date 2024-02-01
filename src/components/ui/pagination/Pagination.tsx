'use client';
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoArrowForwardOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

type Props = {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const pageString = searchParams.get('page') ?? 1;
  
  const isValidPage = !isNaN(+pageString);

  let currentPage = !isValidPage ? 1 : +pageString;

  if (currentPage < 1 || !isValidPage)
    redirect(pathname);

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...')
      return `${pathname}?${params.toString()}`

    if (+pageNumber <= 0)
      return `${pathname}`

    if (+pageNumber > totalPages)
      return `${pathname}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`

  }

  return (
    <div className="flex justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none gap-2">
          <li className="page-item disabled">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)} aria-disabled="true">
              <IoChevronBackOutline size={30} className="text-slate-500" />
            </Link>
          </li>

          {
            allPages.map((page, i) => (
              <li key={`${i}-${page}`} className="page-item">
                <Link
                  className={
                    clsx(
                      "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        'bg-slate-700 text-slate-100 hover:bg-slate-700 hover:text-slate-100': page === currentPage
                      }
                    )
                  }
                  href={createPageUrl(page)}
                >{page}</Link>
              </li>
            ))
          }

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} className="text-slate-500" />
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  )
}
