"use server";

import { searchBooks } from "@/lib/openLibrary";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { BookDetails } from "@/types";

export async function searchBooksByQuery(
  filter: string,
  query: string,
  page = 1,
  limit = 20
): Promise<{ books: BookDetails[]; total: number }> {
  if (!query) {
    throw new Error("Query parameter is required");
  }
  try {
    const offset = (page - 1) * limit;
    const apiResponse = await searchBooks(filter, query, limit, offset);
    const books: BookDetails[] = apiResponse.docs.map((doc: any) => ({
      key: doc.key.split("/works/")[1],
      title: doc.title,
      author: doc.author_name,
      cover: doc.cover_i,
      publish_date: doc.first_publish_year,
    }));
    return {
      books,
      total: apiResponse.numFound,
    };
  } catch (error) {
    throw new Error("Error: Failed to fetch books. ");
  }
}
