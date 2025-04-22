"use client";

import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { BookDetails } from "@/types";
import { Loader2 } from "lucide-react";
import Reviews from "@/components/reviews/Reviews";
import ReviewForm from "@/components/reviews/ReviewForm";
import StarRating from "@/components/StarRating";

const montserrat = Montserrat({ subsets: ["latin"] });

interface BookDetailsProps {
  currentBook: BookDetails | null;
  bookDetails: BookDetails;
  bookReviews: ReviewDetails[];
  bookRating: number;
  isLoading: boolean;
  mutate: () => void;
}

export default function BookDetailsComponent({
  currentBook,
  bookDetails,
  bookReviews,
  bookRating,
  isLoading,
  mutate,
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
        className={`${montserrat.className} text-base text-md text-gray-500 mb-1 ml-0.5`}
      >
        {currentBook?.author}
      </p>

      <div className="flex items-center mb-3">
        <StarRating value={bookRating} className="w-5 h-5" />
        {bookReviews && bookReviews.length > 0 ? (
          <>
            <div></div>
            <span className="ml-2 text-sm text-gray-500 mt-0.5">
              {bookRating.toFixed(1)}
            </span>
            <p className="text-xs text-gray-500 ml-2 mt-1">
              • {bookReviews.length} ratings
            </p>
          </>
        ) : (
          <span className="ml-2 text-xs text-gray-500 italic mt-1">
            No ratings
          </span>
        )}
      </div>

      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-olive-green-400 animate-spin" />
          </div>
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
                    className={`${montserrat.className} text-sm text-gray-600 whitespace-nowrap`}
                  >
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bookDetails.genres.map((genre: string, index: number) => (
                      <button
                        key={index}
                        className={`${montserrat.className} h-5 border-t-none border-b-2 border-aqua hover:border-gray-500 hover:text-gray-500 text-navy-600 text-xxs font-bold`}
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
                mutate={mutate}
              />
              <Reviews reviews={bookReviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
