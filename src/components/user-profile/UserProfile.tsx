"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { ReadingStatus } from "@prisma/client";
import { useState } from "react";
import { BookOpen, BookMarked } from "lucide-react";
import { Montserrat, Lora } from "next/font/google";
import UserFollowingList from "./UserList";
import ReadingGoalDialog from "./ReadingGoalDialog";
import VirtualLibrary from "./VirtualLibraryBox";
import ReadingChallengeBox from "./ReadingChallengeBox";

const montserrat = Montserrat({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export default function UserProfile() {
  const {
    firstName,
    lastName,
    email,
    profileImageUrl,
    followerIds,
    followingIds,
    savedBooks,
    isLoadingBooks,
  } = useUserContext();

  const [readingGoal, setReadingGoal] = useState(0);
  const [newGoal, setNewGoal] = useState(readingGoal);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [view, setView] = useState<"default" | "followers" | "following">(
    "default"
  );

  return (
    <aside className="w-full md:w-[27%] bg-white md:fixed md:h-[90vh] mt-5 border border-olive-green-100  overflow-auto">
      {/* Profile Header */}
      <div className="pt-6 pb-4 px-4 border-b border-olive-green-100">
        <div className="flex flex-col items-center">
          <Avatar className="h-40 w-40 md:h-36 w-36 lg:h-40 lg:w-40 shadow-sm mb-4">
            <AvatarImage src={profileImageUrl} alt="User avatar" />
            <AvatarFallback className="bg-olive-green-400 text-white text-3xl">
              {firstName && lastName
                ? `${firstName[0]}${lastName[0]}`
                : email
                ? email[0].toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>

          <h3 className={`${montserrat.className} text-lg text-navy-600`}>
            {firstName} {lastName}
          </h3>
          <p className={`${montserrat.className} text-xs text-gray-400 mb-3`}>
            {email}
          </p>

          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setView("followers")}
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">{followerIds?.length || 0}</span>
              <span className="text-xs">
                Follower{followerIds?.length === 1 ? "" : "s"}
              </span>
            </button>
            <button
              onClick={() => setView("following")}
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">{followingIds?.length || 0}</span>
              <span className="text-xs">Following</span>
            </button>
          </div>
        </div>
      </div>

      {view === "default" ? (
        <>
          <VirtualLibrary />
          <ReadingChallengeBox
            isGoalDialogOpen={isGoalDialogOpen}
            setIsGoalDialogOpen={setIsGoalDialogOpen}
          />
        </>
      ) : (
        <UserFollowingList
          type={view}
          userIds={view === "followers" ? followerIds : followingIds}
          onBack={() => setView("default")}
        />
      )}

      <ReadingGoalDialog
        isGoalDialogOpen={isGoalDialogOpen}
        setIsGoalDialogOpen={setIsGoalDialogOpen}
      />
    </aside>
  );
}
