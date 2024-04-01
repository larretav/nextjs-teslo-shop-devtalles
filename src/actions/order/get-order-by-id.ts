'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user) return {
    ok: false,
    message: 'No hay sesión de usuario'
  }

  try {

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: {
            country: true,
            order: true
          }
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1
                }
              }
            }
          }
        },
        user: true
      }
    })

    if (!order) throw new Error(`Orden ${id} no existe`);

    if (session.user.role === 'role') {
      if (session.user.id !== order.userId)
        throw new Error(`La orden ${id} no es de este usuario`);
    }

    return {
      ok: true,
      order
    }

  } catch (error: any) {
    console.log(error)

    return {
      ok: false,
      message: error.message
    }
  }



}