"use server";

import { prisma } from "@/lib/prisma";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId,
      },
    });

    revalidatePath(`/book/${bookId}`);
    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
