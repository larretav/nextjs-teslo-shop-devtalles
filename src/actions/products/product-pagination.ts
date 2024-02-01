'use server';

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number,
  take?: number
}

interface PaginatedProducts {
  currentPage: number,
  totalPages: number,
  products: Product[]
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions): Promise<PaginatedProducts> => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    });

    // Obtener el total de páginas
    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product: any) => ({
        ...product,
        images: product.ProductImage.map((image: any) => image?.url)
      }))
    }



  } catch (error) {
    throw new Error('No se pudieron cargar los productos')

  }

}