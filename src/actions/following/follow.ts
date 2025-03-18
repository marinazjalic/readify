"use server";

import { prisma } from "@/lib/prisma";

export async function follow(
  userIdToFollow: string,
  userIdFollowing: string
): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userIdFollowing },
      data: {
        followingIds: {
          push: userIdToFollow,
        },
      },
    }),
    prisma.user.update({
      where: { id: userIdToFollow },
      data: {
        followerIds: {
          push: userIdFollowing,
        },
      },
    }),
  ]);
}
