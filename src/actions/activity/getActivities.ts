"use server";

import { prisma } from "@/lib/prisma";
import { Activity, ActivityType } from "@prisma/client";
import { ReferenceType } from "@prisma/client";

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

  return activities;
}
