'use server';
import { Country } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getCountries = async (): Promise<Country[]> => {
  try {

    const countries = await prisma.country.findMany();

    return countries

  } catch (error) {
    throw new Error('No se pudieron cargar los países')

  }
}