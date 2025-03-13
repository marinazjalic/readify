"use server";

import { prisma } from "@/lib/prisma";
import { SavedBook } from "@prisma/client";
import { ReadingStatus } from "@prisma/client";

export async function updateSavedBook(
  bookKey: string,
  userId: string,
  data: { status?: ReadingStatus; progress?: number; isPinned?: boolean }
): Promise<SavedBook | null> {
  try {
    return await prisma.savedBook.update({
      where: {
        userId_bookKey: {
          userId,
          bookKey,
        },
      },
      data: data,
    });
  } catch (error) {
    console.error("Error updating saved book:", error);
    return null;
  }
}
