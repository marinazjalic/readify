"use server";

import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";

export async function createReview(
  bookKey: string,
  userId: string,
  rating: number,
  content?: string
): Promise<{ success: boolean; data?: Review }> {
  try {
    console.log(bookKey, userId, rating, content);
    const review = await prisma.review.create({
      data: {
        userId: userId,
        bookKey: bookKey,
        rating: rating,
        content: content,
      },
    });

    return { success: true, data: review };
  } catch (error) {
    throw new Error("Error: Failed to create a review.");
  }
}
