"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publish_date: Date;
  rating: number;
  genres: string[];
}

export async function getBooksByGenre(genre: string): Promise<Book[]> {
  try {
    const booksByGenre = await prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
    });
    revalidatePath("/");
    return booksByGenre;
  } catch (error) {
    throw new Error("Error: Failed to filter books by genre. ");
  } finally {
    await prisma.$disconnect();
  }
}
