"use server";

import { searchBooks } from "@/lib/openLibrary";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function searchBooksByQuery(query: string): Promise<Book[]> {
  if (!query) {
    throw new Error("Query parameter is required");
  }

  try {
    const books = await searchBooks(query);
    revalidatePath("/search");
    return books;
  } catch (error) {
    throw new Error("Error: Failed to fetch books. ");
  }
}
