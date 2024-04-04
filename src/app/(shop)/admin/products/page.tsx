// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders, getPaginatedProductsWithImages } from '@/actions';
import { Pagination, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page?: string
  }
}


export default async function AllProductsPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page, take: 6 });

  console.log(products[0].images)

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>

            {
              products?.map(prod => (
                <tr key={prod.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Image
                      src={"/products/" + prod.images[0]}
                      alt={prod.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>

                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="hover:underline"
                    >
                      {prod.title}
                    </Link>
                  </td>

                  <td className="text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                    {currencyFormat(prod.price)}
                  </td>

                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {prod.gender}
                  </td>

                  <td className="text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                    {prod.inStock}
                  </td>

                  <td className="text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                    {prod.sizes.join(', ')}
                  </td>



                </tr>
              ))
            }

          </tbody>
        </table>

        <Pagination totalPages={totalPages} />

      </div>
    </>
  );
}