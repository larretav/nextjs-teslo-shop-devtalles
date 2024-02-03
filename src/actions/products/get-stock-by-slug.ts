'use server';
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug
      },
      select: { inStock: true }
    });


    return product?.inStock ?? 0;

  } catch (error) {
    throw new Error('Error al obtener el producto por slug')
  }
}