'use server';
import prisma from "./prisma";

export const getTodos = async () => {
  try {
    const todos = await prisma.todo.findMany()
  } catch (error) {
    console.log(error)
  }
}