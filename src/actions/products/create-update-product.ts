'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
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
})

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


      }
    })

    // TODO: revalidatePaths
    return {
      ok: true,
      data: productParsed.data
    }

  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error.message
    }
  }
}