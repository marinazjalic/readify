"use server";

import { searchBooks } from "@/lib/openLibrary";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { BookOverview } from "@/types";

export async function searchBooksByQuery(
  filter: string,
  query: string
): Promise<BookOverview[]> {
  if (!query) {
    throw new Error("Query parameter is required");
  }
  try {
    const apiResponse = await searchBooks(filter, query);
    const books: BookOverview[] = apiResponse.docs.map((doc: any) => ({
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
