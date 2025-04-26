"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { User } from "@prisma/client";
import { uploadProfileImage } from "@/actions/upload/uploadProfileImage";
import { cn } from "@/lib/utils";

interface UserAvatarEditorProps {
  userProfile: Omit<User, "password">;
  mutate: () => void;
}

export default function UserAvatarEditor({
  userProfile,
  mutate,
}: UserAvatarEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [defaultColour, setDefaultColour] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (userProfile?.profileImageUrl) {
      setPreviewUrl(userProfile.profileImageUrl);
    }
  }, [userProfile?.profileImageUrl]);

  useEffect(() => {
    if (userProfile?.profileImageColour) {
      setDefaultColour(userProfile.profileImageColour);
    }
  }, [userProfile?.profileImageColour]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProfileImage(userProfile.id, formData);

      if (result.success) {
        mutate();
      } else {
        setPreviewUrl(userProfile?.profileImageUrl || undefined);
      }
    } catch (error) {
      setPreviewUrl(userProfile?.profileImageUrl || undefined);
    } finally {
      setIsUploading(false);
    }
  };

  const getAvatarBgClass = () => {
    if (!defaultColour) return "bg-gray-400";

    switch (defaultColour) {
      case "bright-blue":
        return "bg-bright-blue";
      case "bright-orange":
        return "bg-bright-orange";
      case "light-purple":
        return "bg-light-purple";
      case "bright-coral":
        return "bg-bright-coral";
      case "dark-blue":
        return "bg-dark-blue";
      case "bright-green":
        return "bg-bright-green";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="relative cursor-pointer"
              onClick={() =>
                document.getElementById("profile-picture-input")?.click()
              }
            >
              <Avatar className="h-40 w-40 md:h-36 md:w-36 lg:h-40 lg:w-40 shadow-sm mb-4 border border-gray-200 border-2">
                <AvatarImage
                  src={previewUrl || "/placeholder.svg"}
                  alt="User avatar"
                  className="object-cover"
                />
                <AvatarFallback
                  className={cn(getAvatarBgClass(), "text-white text-6xl")}
                >
                  {userProfile
                    ? `${userProfile?.firstName[0].toUpperCase()}`
                    : "U"}
                </AvatarFallback>
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="translate-y-52">
            <p>Change your avatar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <input
        type="file"
        id="profile-picture-input"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
