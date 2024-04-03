'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma'

export const getPaginatedOrders = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin') return {
    ok: false,
    message: 'No cuenta con los provilegios para realizar esta operación'
  }

  try {

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
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