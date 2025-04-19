"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@prisma/client";

interface UserAvatarEditorProps {
  userProfile: Omit<User, "password">;
}

export default function UserAvatarEditor({
  userProfile,
}: UserAvatarEditorProps) {
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
              <Avatar className="h-40 w-40 md:h-36 w-36 lg:h-40 lg:w-40 shadow-sm mb-4">
                <AvatarImage
                  src={
                    userProfile?.profileImageUrl
                      ? userProfile.profileImageUrl
                      : undefined
                  }
                  alt="User avatar"
                />
                <AvatarFallback className="bg-olive-green-400 text-white text-6xl">
                  {userProfile
                    ? `${userProfile?.firstName[0].toUpperCase()}${userProfile?.lastName[0].toUpperCase()}`
                    : "U"}
                </AvatarFallback>
              </Avatar>
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
      />
    </div>
  );
}
