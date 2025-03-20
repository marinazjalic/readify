"use server";

import { prisma } from "@/lib/prisma";
import { Activity, ActivityType } from "@prisma/client";
import { ReferenceType } from "@prisma/client";

export async function createActivity(
  userId: string,
  activityType: ActivityType,
  bookKey?: string,
  bookTitle?: string,
  discussion?: string,
  reviewId?: string,
  savedBookId?: string
): Promise<{ success: boolean; data?: Activity }> {
  try {
    const activity = await prisma.activity.create({
      data: {
        userId: userId,
        bookKey: bookKey ?? undefined,
        bookTitle: bookTitle ?? undefined,
        activityType: activityType,
        reviewId: reviewId ?? undefined,
        savedBookId: savedBookId ?? undefined,
        discussion: discussion ?? undefined,
      },
    });

    return { success: true, data: activity };
  } catch (error) {
    throw new Error("Error: Failed to create activity.");
  }
}
