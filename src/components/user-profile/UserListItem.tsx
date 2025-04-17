import { follow } from "@/actions/following/follow";
import { unfollow } from "@/actions/following/unfollow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FollowUser } from "@/app/hooks/useUserSWR";
import { User } from "@prisma/client";

interface UserListItemProps {
  user: FollowUser;
  userProfile: Omit<User, "password">;
  mutateFollowing: () => void;
  mutate: () => void; //mutates user profile
}

export default function UserListItem({
  user,
  userProfile,
  mutateFollowing,
  mutate,
}: UserListItemProps) {
  const isFollowing = userProfile?.followingIds?.includes(user.id);

  const handleFollowUnfollow = async (targetUserId: string, action: string) => {
    if (action === "unfollow") {
      await unfollow(targetUserId, userProfile.id);
    } else {
      await follow(targetUserId, userProfile.id);
    }

    mutateFollowing();
    mutate();
  };
  return (
    <li key={user.id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.profileImageUrl || undefined}
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
        size="sm"
        onClick={() =>
          handleFollowUnfollow(user.id, isFollowing ? "unfollow" : "follow")
        }
        className={
          isFollowing
            ? "bg-white border border-olive-green-500 text-navy-500 hover:bg-cream-100 text-xs h-8"
            : "bg-olive-green-500 hover:bg-olive-green-400 text-white text-xs h-8"
        }
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </li>
  );
}
