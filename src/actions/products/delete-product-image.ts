'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';


export const deleteProductImage = async (imageId: number, imageUrl: string) => {

  const folderName = process.env.CLOUDINARY_FOLDER

  if (!imageUrl.startsWith('http'))
    return {
      ok: false,
      message: 'No se pueden eliminar imagenes de FileSystem'
    }

  const imageName = getImageName(imageUrl);

  try {

    await cloudinary.uploader.destroy(`${folderName}/${imageName}`)
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })




    // TODO: revalidatePaths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)



    return {
      ok: true,
      message: 'Imagenes eliminadas'
    }

  } catch (error: any) {
    return {
      ok: false,
      message: 'No se pudo eliminar imagen del producto'
    }
  }
}

const getImageName = (imageUrl: string) => {
  return imageUrl.split('/').at(-1)?.split('.')[0] ?? ''
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
            folder: process.env.CLOUDINARY_FOLDER,
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