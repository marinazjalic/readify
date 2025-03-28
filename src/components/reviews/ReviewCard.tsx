import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { follow } from "@/actions/following/follow";
import StarRating from "../StarRating";
import { Montserrat } from "next/font/google";

interface ReviewCardProps {
  review: ReviewDetails;
}
const montserrat = Montserrat({ subsets: ["latin"] });
export default function ReviewCard({ review }: ReviewCardProps) {
  const handleFollowButton = async (userId: string, followedBy: string) => {
    await follow(userId, followedBy);
  };
  const { data: session } = useSession();

  return (
    <Card key={review.id}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={review.user.profileImageUrl || undefined}
                alt={review.user.firstName || "User avatar"}
              />

              <AvatarFallback>
                {review.user.firstName.charAt(0) +
                  review.user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className={`text-xs font-semibold pt-3 ${montserrat.className}`}>
              {review.user.firstName + " " + review.user.lastName[0] + ". "}
            </p>

            {session && session.user.id != review.userId && (
              <Button
                variant="ghost"
                size="sm"
                className={`text-olive-green-500 hover:bg-transparent hover:underline hover:text-olive-green-400 ${montserrat.className}`}
                onClick={() =>
                  handleFollowButton(review.userId, session.user.id)
                }
              >
                Follow
              </Button>
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
              <div className="py-1.5 p-0 rounded-md border-l-2 border-gray-300">
                {review.subject && (
                  <p className="text-xs ml-1.5 font-semibold">
                    {review.subject}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2 ml-1.5">
                  {review.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
