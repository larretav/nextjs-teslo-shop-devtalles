import { initialData } from "./seed";
// import prisma from "../lib/prisma";
import { Category, PrismaClient } from "@prisma/client";
import { seedCountries } from "./seed-countries";
const prisma = new PrismaClient();

async function main() {

  // 1. Borrar registros previos
  // await Promise.all([
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();
  // ])

  const { categories, products, users } = initialData;

  // 2. Llenar Categorias
  const categoriesData = categories.map(name => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  // 3. Preparar Categorias para Productos
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map: Record<string, string>, category: Category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {});

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

  // 5. Insertar Usuarios
  await prisma.user.createMany({ data: users })

  // 6. Insertar Países
  await prisma.country.createMany({ data: seedCountries })

  console.log('Seed ejecutado correctamente')
}


(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})()