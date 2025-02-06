'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from 'next/cache';

interface LoginCredentials {
 email: string;
 password: string;
}

interface User {
 id: string;
 email: string;
 firstName: string;
 lastName: string;
 dateCreated: Date;
}

export async function validateUser(credentials: LoginCredentials): Promise<User | null> {
 try {
   const user = await prisma.user.findUnique({
     where: {
       email: credentials.email,
     },
   });

   if (!user) {
     throw new Error("User does not exist. Please verify credentials.");
   }

   const correctPassword = await bcrypt.compare(credentials.password, user.password);
   if (correctPassword) {
     const { password, ...userWithoutPassword } = user;
     revalidatePath('/');
     return userWithoutPassword;
   }
   
   return null;
 } catch (error) {
   console.error("Error validating user:", error);
   throw new Error("Failed to validate user");
 } finally {
   await prisma.$disconnect();
 }
}