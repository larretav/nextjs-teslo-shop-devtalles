'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod'

const folderName = process.env.CLOUDINARY_FOLDER

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

    const { product } = await prisma.$transaction(async (txPrisma) => {

      let product: Product;

      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await txPrisma.product.update({
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
        product = await txPrisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: tagsArray
          }
        })
      }

      // Subida de imagenes a Cloudinary
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[], validatedProduct.tags)
        if (!images) throw new Error('No se pudieron cargar las imagenes (rollback)')

        await txPrisma.productImage.createMany({
          data: images.map(img => ({
            url: img!,
            productId: product.id
          }))
        })
      }

      return { product }
    })


    // TODO: revalidatePaths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)



    return {
      ok: true,
      product
    }

  } catch (error: any) {
    return {
      ok: false,
      message: 'No se pudo actualizar/crear el producto'
    }
  }
}


const uploadImages = async (images: File[], tags: string) => {
  try {
    const uploadPromises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const imgBase64 = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader.upload(
          `data:image/png;base64,${imgBase64}`,
          {
            folder: folderName,
            tags: tags.split(',')
          }
        ).then(r => r.secure_url);
      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;

  } catch (error) {
    console.log(error)
    return null
  }
}