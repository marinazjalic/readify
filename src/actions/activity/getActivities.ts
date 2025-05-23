"use server";

import { prisma } from "@/lib/prisma";
import { ActivityDetails } from "@/types";
import {
  Activity,
  ActivityType,
  ReadingStatus,
  SavedBook,
} from "@prisma/client";

export async function getActivitiesForFeed(
  currentUserId: string
): Promise<ActivityDetails[]> {
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
      savedBook: true,
      review: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return activities.map((activity) => ({
    ...activity,
    activityDescription: getActivityDescription(
      activity.activityType,
      activity.bookTitle || "",
      activity.savedBook || undefined
    ),
    review: activity.review || undefined,
    savedBook: activity.savedBook || undefined,
    user: activity.user,
  }));
}

function getActivityDescription(
  activityType: ActivityType,
  bookTitle?: string,
  savedBook?: SavedBook
): string {
  switch (activityType) {
    case ActivityType.REVIEWED:
      return `left a review for ${bookTitle}.`;
      break;
    case ActivityType.UPDATED_PROGRESS:
      return `is on page ${savedBook?.progress}/${savedBook?.pageCount} of ${bookTitle}`;
      break;
    case ActivityType.UPDATED_STATUS:
      if (savedBook?.status === ReadingStatus.COMPLETED) {
        return `finished reading ${bookTitle}`;
      }
      if (savedBook?.status === ReadingStatus.IN_PROGRESS) {
        return `started reading ${bookTitle}`;
      }
      if (savedBook?.status === ReadingStatus.TO_READ) {
        return `added ${bookTitle} to their reading list`;
      } else return "";
      break;
    case ActivityType.DISCUSSION:
      return "started a discussion.";
      break;
    default:
      return "";
  }
}
