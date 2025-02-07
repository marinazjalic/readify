"use server";

import { prisma } from "@/lib/prisma";
import { Book, SavedBook } from "@prisma/client";
import { revalidatePath } from "next/cache";

const getBooksByUser = async (userId: string): Promise<SavedBook[] | null> => {
  try {
    const savedBooks = await prisma.savedBook.findMany({
      where: { userId: userId },
    });
    revalidatePath("/");
    return savedBooks;
  } catch (error) {
    throw new Error("Error: Failed to find saved books.");
  } finally {
    await prisma.$disconnect();
  }
};

export default getBooksByUser;
