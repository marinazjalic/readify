"use server";

import { prisma } from "@/lib/prisma";
import { SavedBook } from "@prisma/client";

export async function deleteSavedBook(
  bookKey: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.savedBook.delete({
      where: {
        userId_bookKey: {
          userId,
          bookKey,
        },
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error: Failed to remove book." };
  }
}
