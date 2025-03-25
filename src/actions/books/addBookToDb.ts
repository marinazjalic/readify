"use server";

import { prisma } from "@/lib/prisma";
import { Book } from "@prisma/client";

export async function addBookToDb(
  title: string,
  author?: string[],
  description?: string,
  genres?: string[],
  coverUrl?: string,
  bookKey?: string
): Promise<{ success: boolean; data?: Book }> {
  try {
    //check if book is already in db
    const bookInDb = await prisma.book.findFirst({
      where: {
        title: title,
        author: { hasSome: author || [] },
      },
    });

    if (bookInDb) {
      return { success: false };
    }
    const book = await prisma.book.create({
      data: {
        title: title,
        author: author || [],
        description: description ? description : null,
        genres: genres || [],
        coverUrl: coverUrl || null,
        bookKey: bookKey || null,
      },
    });
    return { success: true, data: book };
  } catch (error) {
    throw new Error("Error: failed to add book to DB. ");
  }
}
