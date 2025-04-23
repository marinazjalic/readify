import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { follow } from "@/actions/following/follow";
import StarRating from "../StarRating";
import { Montserrat } from "next/font/google";
import { useUserSWR } from "@/app/hooks/useUserSWR";

interface ReviewCardProps {
  review: ReviewDetails;
}
const montserrat = Montserrat({ subsets: ["latin"] });
export default function ReviewCard({ review }: ReviewCardProps) {
  const { data: session } = useSession();

  const { userProfile, mutate } = useUserSWR(
    session?.user ? session.user.id : undefined
  );

  const followingList = userProfile?.followingIds;

  const handleFollowButton = async (userId: string, followedBy: string) => {
    await follow(userId, followedBy);
    mutate();
  };

  return (
    <Card key={review.id} className="bg-cream-100">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center w-[15%]">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={review.user.profileImageUrl || undefined}
                alt={review.user.firstName || "User avatar"}
                className="object-cover"
              />

              <AvatarFallback
                className={
                  review.user.profileImageColour
                    ? `bg-${review.user.profileImageColour} text-white text-lg`
                    : `bg-gray-400 text-white text-lg`
                }
              >
                {review.user.firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className={`text-xs font-semibold pt-3 ${montserrat.className}`}>
              {review.user.firstName + " " + review.user.lastName[0] + ". "}
            </p>

            {session &&
              session.user.id != review.userId &&
              followingList &&
              !followingList.includes(review.userId) && (
                <button
                  className={`bg-navy-500 text-xs px-2 rounded-full h-5 text-white mt-1 ${montserrat.className} hover:bg-opacity-85 hover:text-white`}
                  onClick={() =>
                    handleFollowButton(review.userId, session.user.id)
                  }
                >
                  Follow
                </button>
              )}
          </div>

          <div className="flex-1 space-y-2 mt-2">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <StarRating value={review.rating} className="w-3.5 h-3.5" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {review.content && (
              <div>
                {review.subject && (
                  <p className="text-xs font-semibold">{review.subject}</p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">{review.content}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
