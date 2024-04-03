'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma'

export const getPaginatedUsers = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin') return {
    ok: false,
    message: 'No cuenta con los provilegios para realizar esta operación'
  }

  try {

    const users = await prisma.user.findMany({orderBy: {name: 'asc'}})

    return {
      ok: true,
      users
    }

  } catch (error: any) {
    console.log(error)

    return {
      ok: false,
      message: error
    }
  }



}