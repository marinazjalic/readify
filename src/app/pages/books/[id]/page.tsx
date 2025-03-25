"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookByKey } from "@/actions/books/getBookByKey";
import { useBookStore } from "@/lib/bookStore";
import ReviewForm from "@/components/reviews/ReviewForm";
import { Review } from "@prisma/client";
import { getBooksByGenre } from "@/actions/books/getBooksByGenre";
import { useRouter } from "next/navigation";
import { getReviewsByBook } from "@/actions/reviews/getReviewsByBook";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import LoadingSpinner from "@/components/LoadingSpinner";
import Reviews from "@/components/reviews/Reviews";
import StarRating from "@/components/StarRating";
import { addBookToDb } from "@/actions/books/addBookToDb";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function BookDetails({ params }: { params: { id: string } }) {
  const [wantToRead, setWantToRead] = useState(false);
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [bookReviews, setBookReviews] = useState<ReviewDetails[]>([]);
  const [bookRating, setBookRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const currentBook = useBookStore((state) => state.currentBook);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (currentBook) {
        try {
          const details = await getBookByKey(currentBook.key, currentBook);
          const reviews = await getReviewsByBook(currentBook.key);

          let { title, author, cover, key, description, genres } = details;

          //save a copy to DB
          await addBookToDb(
            title,
            author,
            description,
            genres,
            String(cover),
            key
          );

          getRating(reviews);
          setBookDetails(details);
          setBookReviews(reviews);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch book details. Error: ", error);
        }
      }
    };
    fetchBookDetails();
  }, [currentBook]);

  const handleGenreBtnClick = async (genre: string) => {
    router.push(`/pages/books?filter=subject&query=${genre}`);
  };

  const getRating = (reviews: ReviewDetails[]) => {
    const ratingSum = reviews
      .filter((review) => review.rating)
      .reduce((sum, review) => sum + review.rating, 0);
    const avgRating = ratingSum / reviews.length;
    setBookRating(avgRating);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen bg-white text-sm pt-0`}
    >
      <div className="w-full lg:w-1/4 lg:fixed lg:left-0 lg:top-[120px] lg:bottom-0 p-4 flex flex-col items-center space-y-4">
        <div className="w-full max-w-[220px]">
          <Image
            src={`https://covers.openlibrary.org/b/id/${currentBook?.cover}-L.jpg`}
            alt={`Cover of ${currentBook?.title}`}
            width={220}
            height={320}
            className="shadow-xl rounded-tr-xl rounded-br-xl"
          />
        </div>
        <Button
          onClick={() => setWantToRead(!wantToRead)}
          variant={wantToRead ? "default" : "outline"}
          className="w-full max-w-[220px] rounded-full bg-navy-600 hover:bg-navy-500 hover:text-white text-white text-xs"
        >
          {wantToRead ? "Added to List" : "Want to Read"}
        </Button>
      </div>

      {/* right side content */}
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
          <span className="ml-2 text-sm">
            {bookRating.toFixed(1)} ({Math.floor(bookRating * 20)}%)
          </span>
        </div>

        <div className="relative min-h-[400px]">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-6">
              <div>
                {/* loading the book description */}
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
                      {bookDetails.genres.map(
                        (genre: string, index: number) => (
                          <button
                            key={index}
                            className={`${montserrat.className} border-t-none border-b-2 border-olive-green-500 hover:border-gray-400 hover:text-gray-500 text-navy-600 text-xxs font-bold`}
                            onClick={() => handleGenreBtnClick(genre)}
                          >
                            {genre}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* loading review dialog */}
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

        {/* <div className="space-y-1 text-xs"> //get these details later
          <p>
            <strong>Published:</strong>{" "}
            {bookDetails.publish_date.toDateString()}
          </p>
          <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
        </div> */}
      </div>
    </div>
  );
}
