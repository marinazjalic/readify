"use server";

import { prisma } from "@/lib/prisma";
import { Challenge } from "@prisma/client";
import { createNewChallenge } from "./createNewChallenge";

export async function updateChallenge(
  userId: string,
  goal: number
): Promise<Challenge> {
  try {
    const year = new Date().getFullYear();
    const existingChallenge = await prisma.challenge.findUnique({
      where: {
        userId_year: {
          userId,
          year,
        },
      },
    });
    // update challenge if existing, otherwise create challenge
    if (existingChallenge) {
      return await prisma.challenge.update({
        where: {
          id: existingChallenge.id,
        },
        data: {
          goal,
        },
      });
    }
    return await createNewChallenge(userId, goal);
  } catch (error) {
    throw new Error("Error: Failed to update challenge. ");
  }
}
