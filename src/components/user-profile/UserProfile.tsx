"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import UserFollowList from "./UserFollowList";
import ReadingGoalDialog from "./ReadingGoalDialog";
import VirtualLibrary from "./VirtualLibraryBox";
import ReadingChallengeBox from "./ReadingChallengeBox";
import { useUserSWR } from "@/app/hooks/useUserSWR";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatarEditor from "./UserAvatarEditor";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function UserProfile() {
  const { data: session } = useSession();
  const [view, setView] = useState<"default" | "followers" | "following">(
    "default"
  );
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  const {
    userProfile,
    mutate,
    followers,
    followersError,
    mutateFollowers,
    followingList,
    followingError,
    mutateFollowing,
    challenge,
    challengeError,
    isChallengeLoading,
    mutateChallenge,
  } = useUserSWR(session?.user ? session.user.id : undefined);

  const isFollowersLoading = userProfile && !followers && !followersError;
  const isFollowingLoading = userProfile && !followingList && !followingError;

  // render main content based on view
  const renderMainContent = () => {
    if (view === "default") {
      return (
        <>
          <VirtualLibrary />
          <ReadingChallengeBox
            isGoalDialogOpen={isGoalDialogOpen}
            setIsGoalDialogOpen={setIsGoalDialogOpen}
            challenge={challenge ?? undefined}
          />
        </>
      );
    } else {
      if (!userProfile) return null;
      return (
        <UserFollowList
          type={view}
          users={view === "followers" ? followers : followingList}
          userProfile={userProfile}
          isLoading={
            view === "followers"
              ? !!isFollowersLoading
              : view === "following"
              ? !!isFollowingLoading
              : false
          }
          onBack={() => setView("default")}
          mutateFollowing={mutateFollowing}
          mutate={mutate} //mutate user profile
        />
      );
    }
  };

  return (
    <aside className="w-full md:w-[27.5%] bg-white md:fixed md:h-[90vh] border border-olive-green-100 overflow-auto px-4">
      <div className="pt-6 pb-4 px-4 border-b border-olive-green-100">
        <div className="flex flex-col items-center">
          <UserAvatarEditor userProfile={userProfile!} />

          <h3 className={`${montserrat.className} text-lg text-navy-600`}>
            {userProfile?.firstName} {userProfile?.lastName}
          </h3>
          <p className={`${montserrat.className} text-xs text-gray-400 mb-3`}>
            {userProfile?.email}
          </p>

          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setView("followers")}
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">
                {userProfile?.followerIds?.length || 0}
              </span>
              <span className="text-xs">
                Follower{userProfile?.followerIds?.length === 1 ? "" : "s"}
              </span>
            </button>
            <button
              onClick={() => setView("following")}
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">
                {userProfile?.followingIds?.length || 0}
              </span>
              <span className="text-xs">Following</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (Followers/Following, Reading Challenge, etc) */}
      {renderMainContent()}

      <ReadingGoalDialog
        isGoalDialogOpen={isGoalDialogOpen}
        setIsGoalDialogOpen={setIsGoalDialogOpen}
        mutateChallenge={mutateChallenge}
      />
    </aside>
  );
}
