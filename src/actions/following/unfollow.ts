"use server";

import { prisma } from "@/lib/prisma";

export async function unfollow(
  userIdToUnfollow: string,
  userId: string
): Promise<void> {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { followingIds: true },
  });

  const userToUnfollow = await prisma.user.findUnique({
    where: { id: userIdToUnfollow },
    select: { followerIds: true },
  });

  if (!currentUser || !userToUnfollow) {
    throw new Error("User not found");
  }

  const updatedFollowingIds = currentUser.followingIds.filter(
    (id) => id !== userIdToUnfollow
  );
  const updatedFollowerIds = userToUnfollow.followerIds.filter(
    (id) => id !== userId
  );

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        followingIds: updatedFollowingIds,
      },
    }),
    prisma.user.update({
      where: { id: userIdToUnfollow },
      data: {
        followerIds: updatedFollowerIds,
      },
    }),
  ]);
}
