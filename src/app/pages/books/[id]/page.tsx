"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getBookByKey } from "@/actions/books/getBookByKey";
import { useBookStore } from "@/lib/bookStore";
import { getReviewsByBook } from "@/actions/reviews/getReviewsByBook";
import { ReviewDetails } from "@/actions/reviews/getReviewsByBook";
import { addBookToDb } from "@/actions/books/addBookToDb";
import BookDetailsComponent from "@/components/book-details/BookDetails";

export default function BookDetails({ params }: { params: { id: string } }) {
  const [wantToRead, setWantToRead] = useState(false);
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [bookReviews, setBookReviews] = useState<ReviewDetails[]>([]);
  const [bookRating, setBookRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentBook = useBookStore((state) => state.currentBook);
  const isCompleteObj = useBookStore((state) => state.isCompleteObj);

  const fetchBookDetails = async () => {
    if (currentBook) {
      if (isCompleteObj) {
        setBookDetails(currentBook);
      } else {
        //if not in DB fetch info
        const details = await getBookByKey(currentBook.key, currentBook);
        setBookDetails(details);

        //save a copy to the DB
        let { title, author, cover, key, description, genres } = details;
        await addBookToDb(
          title,
          author,
          description,
          genres,
          String(cover),
          key
        );
      }
      const reviews = await getReviewsByBook(currentBook.key);
      getRating(reviews);
      setBookReviews(reviews);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBookDetails();
  }, [currentBook]);

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
      {/* left side content */}
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
      <BookDetailsComponent
        currentBook={currentBook}
        bookDetails={bookDetails}
        bookReviews={bookReviews}
        bookRating={bookRating}
        isLoading={isLoading}
      />
    </div>
  );
}
