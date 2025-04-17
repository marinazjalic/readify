"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserDetails(
  userId: string
): Promise<Omit<User, "password"> | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error("Error: Could not find user by ID.");
  }
}
