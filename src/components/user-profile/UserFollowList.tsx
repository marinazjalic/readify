"use client";

import { ArrowLeft } from "lucide-react";
import { Lora } from "next/font/google";
import { FollowUser } from "@/app/hooks/useUserSWR";
import { User } from "@prisma/client";
import UserListItem from "./UserListItem";

const lora = Lora({ subsets: ["latin"] });

interface UserListProps {
  type: "followers" | "following";
  users: FollowUser[] | undefined;
  userProfile: Omit<User, "password">;
  onBack: () => void;
  isLoading: boolean;
  mutateFollowing: () => void;
  mutate: () => void;
}

export default function UserFollowList({
  type,
  users,
  userProfile,
  onBack,
  isLoading,
  mutateFollowing,
  mutate,
}: UserListProps) {
  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-2 border-l-4 border-olive-green-500 pl-2 mb-3">
        <button
          onClick={onBack}
          className="text-olive-green-500 hover:text-teracota-500 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3
          className={`${lora.className} text-sm text-olive-green-500 uppercase tracking-wide`}
        >
          {type === "followers" ? "Followers" : "Following"}
        </h3>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-olive-green-400">Loading...</div>
        </div>
      ) : !users || users.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-xs">
          {type === "followers"
            ? "You don't have any followers yet."
            : "You're not following anyone yet."}
        </div>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              userProfile={userProfile}
              mutateFollowing={mutateFollowing}
              mutate={mutate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
