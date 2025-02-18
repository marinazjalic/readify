"use server";

import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";

export async function getReviewsByBook(bookKey: string): Promise<Review[]> {
  try {
    const reviews: Review[] = await prisma.review.findMany({
      where: { bookKey: bookKey },
    });
    return reviews;
  } catch (error) {
    throw new Error("Error: Failed to fetch reviews. ");
  }
}
