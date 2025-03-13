"use server";

import { prisma } from "@/lib/prisma";
import { DisplayBook } from "@/types";
import { getBookDetails } from "@/lib/openLibrary";

export async function getSavedBooksByUser(
  userId: string
): Promise<DisplayBook[] | null> {
  try {
    const savedBooks = await prisma.savedBook.findMany({
      where: { userId: userId },
    });
    const displayBooks = await Promise.all(
      savedBooks.map(async (book) => {
        const apiResponse = await getBookDetails(book.bookKey);
        const bookDetails: DisplayBook = {
          key: apiResponse.key.split("/works/")[1],
          title: apiResponse.title,
          author: apiResponse.author_name || [], //fix - author name not provided
          cover: apiResponse.covers[0],
          isSaved: true,
          savedInfo: {
            id: book.id,
            status: book.status,
            progress: book.progress,
            dateAdded: book.dateAdded,
            dateUpdated: book.dateUpdated,
            isPinned: book.isPinned || undefined,
          },
        };
        return bookDetails;
      })
    );
    return displayBooks;
  } catch (error) {
    throw new Error("Error: Failed to find saved books.");
  }
}
