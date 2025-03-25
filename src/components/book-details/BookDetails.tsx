"use client";

import { Montserrat } from "next/font/google";
import ReviewForm from "@/components/reviews/ReviewForm";
import { useRouter } from "next/navigation";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import LoadingSpinner from "@/components/LoadingSpinner";
import Reviews from "@/components/reviews/Reviews";
import StarRating from "@/components/StarRating";
import { BookDetails } from "@/types";

const montserrat = Montserrat({ subsets: ["latin"] });

interface BookDetailsProps {
  currentBook: BookDetails | null;
  bookDetails: BookDetails;
  bookReviews: ReviewDetails[];
  bookRating: number;
  isLoading: boolean;
}

export default function BookDetailsComponent({
  currentBook,
  bookDetails,
  bookReviews,
  bookRating,
  isLoading,
}: BookDetailsProps) {
  const router = useRouter();

  const handleGenreBtnClick = async (genre: string) => {
    router.push(`/pages/books?filter=subject&query=${genre}`);
  };

  return (
    <div className="w-full lg:w-3/4 lg:ml-[25%] p-4 overflow-y-auto">
      <h1 className={` ${montserrat.className} text-2xl font-bold mb-1`}>
        {currentBook?.title}
      </h1>
      <p
        className={`${montserrat.className} text-base text-xs text-gray-500 mb-2`}
      >
        {currentBook?.author}
      </p>

      <div className="flex items-center mb-3">
        <StarRating value={bookRating} className="w-4 h-4" />
        {bookReviews && bookReviews.length > 0 ? (
          <>
            <span className="ml-2 text-sm">
              {bookRating.toFixed(1)} ({Math.floor(bookRating * 20)}%)
            </span>
          </>
        ) : (
          <span className="ml-2 text-xs text-gray-500 italic mt-1">
            No ratings
          </span>
        )}
      </div>

      <div className="relative min-h-[400px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {/* displaying book description */}
            <div>
              {bookDetails?.description ? (
                <p
                  className={`${montserrat.className} text-sm leading-relaxed mb-4`}
                >
                  {bookDetails.description.split("([source]")[0]}
                </p>
              ) : null}
            </div>

            {/* loading related genre tags */}
            {bookDetails?.genres?.length ? (
              <div>
                <div className="flex items-center gap-4">
                  <p
                    className={`${montserrat.className} text-xs text-gray-600 whitespace-nowrap`}
                  >
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bookDetails.genres.map((genre: string, index: number) => (
                      <button
                        key={index}
                        className={`${montserrat.className} border-t-none border-b-2 border-olive-green-500 hover:border-gray-400 hover:text-gray-500 text-navy-600 text-xxs font-bold`}
                        onClick={() => handleGenreBtnClick(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* review dialog */}
            <div>
              <ReviewForm
                bookId={bookDetails.key}
                bookTitle={bookDetails.title}
                bookCover={bookDetails.cover}
              />
              <Reviews reviews={bookReviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
