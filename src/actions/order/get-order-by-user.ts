'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma'

export const getOrderByUser = async () => {
  const session = await auth()

  if (!session?.user) return {
    ok: false,
    message: 'No hay sesión de usuario'
  }

  try {

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }

    })

    return {
      ok: true,
      orders
    }

  } catch (error: any) {
    console.log(error)

    return {
      ok: false,
      message: error
    }
  }



}