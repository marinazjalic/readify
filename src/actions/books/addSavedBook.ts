"use server";

import { prisma } from "@/lib/prisma";
import { SavedBook } from "@prisma/client";

export async function addSavedBook(
  bookKey: string,
  userId: string
): Promise<{
  success: boolean;
  data?: SavedBook;
  error?: { message: string; statusCode: number };
}> {
  try {
    const savedBook = await prisma.savedBook.create({
      data: {
        userId: userId,
        bookKey: bookKey,
      },
    });
    return { success: true, data: savedBook };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return {
        success: false,
        error: {
          message: "Error: This book has already been saved by this user",
          statusCode: 409,
        },
      };
    }
    throw new Error("Error: Failed to save book. ");
  }
}
