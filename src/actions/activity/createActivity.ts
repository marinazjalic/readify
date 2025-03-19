"use server";

import { prisma } from "@/lib/prisma";
import { Activity, ActivityType } from "@prisma/client";
import { ReferenceType } from "@prisma/client";

export async function createActivity(
  userId: string,
  activityType: ActivityType,
  bookKey?: string,
  referenceType?: ReferenceType,
  referenceId?: string,
  discussion?: string
): Promise<{ success: boolean; data?: Activity }> {
  try {
    const activity = await prisma.activity.create({
      data: {
        userId: userId,
        bookKey: bookKey ?? undefined,
        activityType: activityType,
        referenceType: referenceType ?? undefined,
        referenceId: referenceId ?? undefined,
        discussion: discussion ?? undefined,
      },
    });

    return { success: true, data: activity };
  } catch (error) {
    throw new Error("Error: Failed to create activity.");
  }
}
