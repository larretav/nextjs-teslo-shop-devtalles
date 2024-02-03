'use server';
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getStockBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });

    if (!product) return null;

    return product
  } catch (error) {
    throw new Error('Error al obtener el producto por slug')
  }
}