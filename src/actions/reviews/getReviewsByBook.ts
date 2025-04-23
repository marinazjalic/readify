"use server";

import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";

export type ReviewDetails = Review & {
  user: {
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    profileImageColour: string | null;
  };
};

//fetch reviews with user details
export async function getReviewsByBook(
  bookKey: string
): Promise<ReviewDetails[]> {
  return prisma.review.findMany({
    where: { bookKey: bookKey },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          profileImageColour: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}
