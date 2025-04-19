"use server";

import { prisma } from "@/lib/prisma";
import { Challenge } from "@prisma/client";

export async function createNewChallenge(
  userId: string,
  goal: number
): Promise<Challenge> {
  const currentYear = new Date().getFullYear();
  try {
    const challenge = await prisma.challenge.create({
      data: {
        userId: userId,
        year: currentYear,
        goal: goal,
      },
    });

    return challenge;
  } catch (error) {
    throw new Error("Error: Failed to create reading challenge. ");
  }
}
