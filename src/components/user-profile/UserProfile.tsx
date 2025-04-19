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
      {/* Profile Header */}
      <div className="pt-6 pb-4 px-4 border-b border-olive-green-100">
        <div className="flex flex-col items-center">
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
      />
    </aside>
  );
}
