"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Lora } from "next/font/google";
import { useUserContext } from "@/context/UserContext";
import { getByIds } from "@/actions/following/getByIds";
import { follow } from "@/actions/following/follow";
import { unfollow } from "@/actions/following/unfollow";
import { useRouter } from "next/navigation";

const lora = Lora({ subsets: ["latin"] });

type UserDetails = {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
  isFollowing?: boolean;
};

interface UserListProps {
  type: "followers" | "following";
  userIds: string[] | undefined;
  onBack: () => void;
}

export default function UserFollowList({
  type,
  userIds = [],
  onBack,
}: UserListProps) {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, followingIds, updateFollowingIds } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      try {
        if (userIds && userIds.length > 0) {
          const fetchedUsers = await getByIds(userIds);

          const usersWithFollowStatus = fetchedUsers.map((user) => ({
            ...user,
            isFollowing: followingIds?.includes(user.id) || false,
          }));

          setUsers(usersWithFollowStatus);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [type, userIds, followingIds]);

  const handleFollowButton = async (
    userToFollow: string,
    isFollowing: string
  ) => {
    if (isFollowing === "unfollow") {
      const newUserIds = followingIds!.filter((id) => id != userToFollow);
      updateFollowingIds(newUserIds);
      await unfollow(userToFollow, userId);
    } else {
      const newUserIds = followingIds
        ? [...followingIds, userToFollow]
        : [userToFollow];
      await follow(userToFollow, userId);
      updateFollowingIds(newUserIds);
    }
  };

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
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          {type === "followers"
            ? "You don't have any followers yet."
            : "You're not following anyone yet."}
        </div>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.profileImageUrl || ""}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback className="bg-olive-green-400 text-white text-xs">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-navy-600 text-sm">
                  {user.firstName} {user.lastName}
                </span>
              </div>

              <Button
                variant={user.isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() =>
                  handleFollowButton(
                    user.id,
                    user.isFollowing ? "unfollow" : "follow"
                  )
                }
                className={
                  user.isFollowing
                    ? "border-olive-green-400 text-navy-500 hover:bg-cream-200 text-xs h-8"
                    : "bg-olive-green-500 hover:bg-olive-green-400 text-white text-xs h-8"
                }
              >
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
