import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { Lora } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewProgressBar from "../ReviewProgressBar";

interface ReviewsProps {
  reviews: ReviewDetails[];
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
      <h2 className={`${lora.className} text-2xl ml-2 font-semibold`}>
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
              <ReviewProgressBar
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
              <div>
                <ReviewCard key={review.id} review={review} />
                <Separator />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
