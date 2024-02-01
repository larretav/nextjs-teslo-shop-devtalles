import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  // 1. Borrar registros previos
  // await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ])

  const { categories, products } = initialData;

  // 2. Llenar Categorias
  const categoriesData = categories.map(name => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  // 3. Preparar Categorias para Productos
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // 4. Insertar en Productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    // Images
    const imagesData = images.map(url => ({ url }));

    await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
        ProductImage: {
          create: imagesData
        }
      }
    })

    // Images
    // const imagesData = images.map(image => ({
    //   url: image,
    //   productId: dbProduct.id
    // }));

    // await prisma.productImage.createMany({
    //   data: imagesData
    // })
  });


  console.log('Seed ejecutado correctamente')
}


(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})()