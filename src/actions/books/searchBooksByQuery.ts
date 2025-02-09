"use server";

import { searchBooks } from "@/lib/openLibrary";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { BookOverview } from "@/types";

export async function searchBooksByQuery(
  query: string
): Promise<BookOverview[]> {
  if (!query) {
    throw new Error("Query parameter is required");
  }
  try {
    const apiResponse = await searchBooks(query);

    const books: BookOverview[] = apiResponse.docs
      .slice(0, 10) //temp show only 10 books
      .map((doc: any) => ({
        key: doc.key.split("/works/")[1],
        title: doc.title,
        author: doc.author_name,
        cover: doc.cover_i,
      }));
    return books;
  } catch (error) {
    throw new Error("Error: Failed to fetch books. ");
  }
}
