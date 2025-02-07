"use server";

import { prisma } from "@/lib/prisma";
import { Book, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    return book;
  } catch (error) {
    throw new Error("Error: Failed to fetch book by ID.");
  } finally {
    await prisma.$disconnect();
  }
}
