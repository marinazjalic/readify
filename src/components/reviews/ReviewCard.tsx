import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { Separator } from "@/components/ui/separator";

interface ReviewCardProps {
  review: ReviewDetails;
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= value ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
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
            <p className="text-xs font-semibold pt-3">
              {review.user.firstName + " " + review.user.lastName[0] + ". "}
            </p>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <StarRating value={review.rating} />
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {review.subject && <p className="text-sm">{review.subject}</p>}

            {review.content && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {review.content}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <Separator />
    </Card>
  );
}
