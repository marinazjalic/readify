"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

interface UserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function createUser(
  userData: UserInput
): Promise<Omit<User, "password"> | null> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    const { password, ...userWithoutPassword } = user;
    revalidatePath("/");
    return userWithoutPassword;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}
