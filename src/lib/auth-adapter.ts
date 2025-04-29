import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { Adapter } from "next-auth/adapters";

interface AdapterUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string | null;
  profileImageColour?: string | null;
}

// Create a custom adapter that extends the PrismaAdapter
export const CustomPrismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  // Override the createUser function to include a password
  async createUser(user: {
    email: string;
    name?: string;
    image?: string;
  }): Promise<AdapterUser> {
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const nameParts = user.name?.split(" ") || ["", ""];
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "";

    const userData = await prisma.user.create({
      data: {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        profileImageUrl: user.image,
      },
    });

    return {
      id: userData.id,
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      image: userData.profileImageUrl,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profileImageUrl: userData.profileImageUrl,
    };
  },
};
