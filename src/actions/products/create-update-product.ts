'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  categoryId: z.string().uuid(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {

  try {
    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)


    if (!productParsed.success) {
      const errors = JSON.parse(productParsed.error.message).map((err: any) => `[${err.path.join(', ')}] - ${err.message}`)
      return {
        ok: false,
        errors
      }
    }

    const validatedProduct = productParsed.data;
    validatedProduct.slug = validatedProduct.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = validatedProduct;

    const prismaTx = await prisma.$transaction(async (tx) => {

      let product: Product;

      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: tagsArray
          }
        })


      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: tagsArray
          }
        })
      }

      return { product }
    })


    // TODO: revalidatePaths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${prismaTx.product.slug}`)
    revalidatePath(`/products/${prismaTx.product.slug}`)
    


    return {
      ok: true,
      product: prismaTx.product
    }

  } catch (error: any) {
    return {
      ok: false,
      message: 'No se pudo actualizar/crear el producto'
    }
  }
}