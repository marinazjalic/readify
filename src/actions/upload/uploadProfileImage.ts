"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function uploadProfileImage(
  userId: string,
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    const filename = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;

    const blob = await put(filename, file, {
      access: "public",
    });

    await prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl: blob.url },
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}
