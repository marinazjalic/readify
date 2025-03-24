"use server";

import { prisma } from "@/lib/prisma";

export async function getByIds(userIds: string[]) {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImageUrl: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error("Error: could not fetch users by IDs. ");
  }
}
