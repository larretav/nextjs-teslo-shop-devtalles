'use server';

import prisma from '@/lib/prisma'

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}


export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

  const currentTax = 0.15;

  // Verificar sesión de usuario
  const session = await auth();
  const userId = session?.user.id

  if (!userId)
    return {
      ok: false,
      message: 'No hay sesión de usuario'
    }

  // Obtener la información de productos
  // NOTA: Podemos llevar 2 o más productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(p => p.productId)
      }
    }
  })

  // Encabezado
  // Calcular los montos
  const itemsInOrder = productIds.reduce((count, prod) => count + prod.quantity, 0);

  // Totales de tax, subtotal y total
  const { tax, subTotal, total } = productIds.reduce((totals, item) => {

    const quantity = item.quantity;
    const product = products.find(product => product.id === item.productId)

    if (!product) throw new Error(`Producto con el id [${item.productId}] no encontrado`);

    const subTotal = product.price * quantity;
    totals.subTotal += subTotal;
    totals.tax += subTotal * currentTax;
    totals.total += subTotal * (1 + currentTax);

    return totals
  }, { tax: 0, subTotal: 0, total: 0 })


  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        // Acumular valores
        const productQuantity = productIds.filter(p => p.productId === product.id).reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0)
          throw new Error(`${product.id} no tiene cantidad definida`);

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity, // No hacer (en este punto el valor de inStock pudo haber cambiado)
            inStock: { decrement: productQuantity }
          }
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // Verificar si hay valores negativos en el stock
      updatedProducts.forEach(product => {
        if (product.inStock < 0)
          throw new Error(`${product.title} no tiene inventario suficiente`)
      })

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productIds.map(prodIds => ({
                quantity: prodIds.quantity,
                size: prodIds.size,
                productId: prodIds.productId,
                price: products.find(product => product.id === prodIds.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      // Validar si algún producto tiene precio cero 0
      const currentOrderItem = await tx.orderItem.findMany({ where: { orderId: order.id } })

      if (currentOrderItem.some(item => item.price === 0))
        throw new Error('Algunos elementos de la orden tienen precio cero ($0)')


      // 3. Crear la dirección de la orden
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })



      return {
        order,
        updatedProducts,
        orderAddress

      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }

}