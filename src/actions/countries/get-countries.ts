'use server';
import prisma from "@/lib/prisma";

import { ISeedCountry } from "@/seed/seed-countries";

export const getCountries = async (): Promise<ISeedCountry[]> => {
  try {

    const countries = await prisma.country.findMany();

    return countries

  } catch (error) {
    throw new Error('No se pudieron cargar los países')

  }
}