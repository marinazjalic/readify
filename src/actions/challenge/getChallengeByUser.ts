"use server";

import { prisma } from "@/lib/prisma";
import { Challenge } from "@prisma/client";

export async function getChallengeByUser(
  userId: string
): Promise<Challenge | null> {
  try {
    const year = new Date().getFullYear();
    const challenge = await prisma.challenge.findUnique({
      where: {
        userId_year: {
          userId,
          year,
        },
      },
    });
    return challenge;
  } catch (error) {
    throw new Error("Error: Could not find challenge. ");
  }
}
