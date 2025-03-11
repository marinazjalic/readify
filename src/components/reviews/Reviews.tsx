import { Star } from "lucide-react";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { Inter, Lora, Montserrat } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import ProgressBar from "../ProgressBar";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface ReviewsProps {
  reviews: ReviewDetails[];
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

const lora = Lora({ subsets: ["latin"] });

export default function Reviews({ reviews }: ReviewsProps) {
  const [filteredReviews, setFilteredReviews] = useState<ReviewDetails[]>([]);
  const [hasRatingFilter, setHasRatingFilter] = useState(false);

  const displayedReviews =
    filteredReviews.length != 0 ? filteredReviews : reviews;

  const handleProgressBarClick = (starCount: number) => {
    const filterByRating = reviews.filter(
      (review) => review.rating == starCount
    );
    setFilteredReviews(filterByRating);
    setHasRatingFilter(true);
  };
  return (
    <div className="space-y-6">
      <h2 className={`${lora.className} text-xl font-semibold`}>
        Reviews & Ratings
      </h2>

      {/* progress bar for rating % and review count */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const starCount = 5 - index;
          const reviewCount = reviews.filter(
            (review) => review.rating == starCount
          ).length;
          const ratingPercent =
            reviews.length != 0 ? (reviewCount / reviews.length) * 100 : 0;
          return (
            <div
              key={starCount}
              onClick={() => handleProgressBarClick(starCount)}
            >
              <ProgressBar
                key={starCount}
                index={starCount}
                ratingPercent={ratingPercent}
                reviewCount={reviewCount}
              />
            </div>
          );
        })}
      </div>

      {/* displaying all reviews initially - clicking on progress bar will display the filtered reviews*/}
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          <Separator />
          {filteredReviews.length === 0 && hasRatingFilter ? (
            <p className="text-gray-500 ml-2 text-xs">No results.</p>
          ) : (
            displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
