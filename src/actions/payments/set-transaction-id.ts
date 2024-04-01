'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma'

export const setTransactionId = async (orderId: string, transactionId: string) => {
  console.log({orderId, transactionId})

  // // Verificar sesión de usuario
  // const session = await auth();
  // const userId = session?.user.id

  // if (!userId)
  //   return {
  //     ok: false,
  //     message: 'No hay sesión de usuario'
  //   }

  try {

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    if (!updatedOrder) throw new Error('Orden no encontrada')

    return {
      ok: true
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message ?? 'No se pudo actualizar el id de la transación de la orden'
    }
  }




}