"use server";

import { getBookDetails } from "@/lib/openLibrary";
import { BookDetails } from "@/types";

export async function getBookByKey(
  key: string,
  bookOverview: BookDetails
): Promise<BookDetails> {
  try {
    const apiResponse = await getBookDetails(key);
    const book: BookDetails = {
      ...bookOverview,
      description:
        "description" in apiResponse
          ? apiResponse.description.value
          : "No description available. ",
    };
    return book;
  } catch (error) {
    throw new Error("Error: Failed to fetch book details. ");
  }
}
