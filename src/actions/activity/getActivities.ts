"use server";

import { prisma } from "@/lib/prisma";
import { Activity, ActivityType } from "@prisma/client";

export async function getActivitiesForFeed(currentUserId: string) {
  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
    select: { followingIds: true },
  });

  if (!currentUser) {
    throw new Error("Error: user not found.");
  }

  const userIdsToShow = [...currentUser.followingIds, currentUserId];

  const activities = await prisma.activity.findMany({
    where: {
      userId: { in: userIdsToShow },
    },
    include: {
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return activities.map((activity) => {
    return {
      ...activity,
      activityDescription: getActivityDescription(activity.activityType),
    };
  });
}

function getActivityDescription(
  activityType: ActivityType,
  bookTitle?: string
): string {
  switch (activityType) {
    case ActivityType.ADDED_TO_LIST:
      return `added ${bookTitle} to their reading list.`;
      break;
    case ActivityType.REVIEWED:
      return `left a review for ${bookTitle}.`;
      break;
    case ActivityType.UPDATED_PROGRESS:
      return `updated their reading progress.`;
      break;
    case ActivityType.UPDATED_STATUS:
      return `finished reading ${bookTitle}`;
      break;
    default:
      return "";
  }
}
