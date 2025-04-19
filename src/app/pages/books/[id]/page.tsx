"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addBookToDb } from "@/actions/books/addBookToDb";
import { addSavedBook } from "@/actions/books/addSavedBook";
import { getReviewsByBook } from "@/actions/reviews/getReviewsByBook";
import { getBookByKey } from "@/actions/books/getBookByKey";
import { useBookStore } from "@/lib/bookStore";
import BookDetailsComponent from "@/components/book-details/BookDetails";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const reviewFetcher = async (key: string) => {
  return getReviewsByBook(key);
};

const bookDetailsFetcher = async (key: string, initialData: any) => {
  if (!key) return null;
  const details = await getBookByKey(key, initialData);

  //save a copy to db
  if (details) {
    let { title, author, cover, key, description, genres } = details;
    await addBookToDb(title, author, description, genres, String(cover), key);
  }
  return details;
};

export default function BookDetails({ params }: { params: { id: string } }) {
  const [wantToRead, setWantToRead] = useState(false);
  const currentBook = useBookStore((state) => state.currentBook);
  const isCompleteObj = useBookStore((state) => state.isCompleteObj);
  const { data: session } = useSession();

  const addToSavedBooks = async () => {
    if (session && currentBook) {
      await addSavedBook(currentBook?.key, session.user.id);
    } else console.error("Error: Failed to add book to reading list.");
  };

  const {
    data: bookDetails,
    error: bookError,
    isLoading: isBookLoading,
  } = useSWR(
    currentBook?.key ? [currentBook.key, currentBook] : null,
    ([key, initialData]) =>
      isCompleteObj ? initialData : bookDetailsFetcher(key, initialData), //if we have all details, dont make a request
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const {
    data: bookReviews = [],
    error: reviewsError,
    isLoading: isReviewsLoading,
    mutate,
  } = useSWR(
    currentBook?.key ? `reviews/${currentBook.key}` : null,
    () => reviewFetcher(currentBook?.key || ""),
    {
      revalidateOnFocus: true,
      dedupingInterval: 30000,
    }
  );

  //reset the scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentBook]);

  const isLoading = isBookLoading || isReviewsLoading;

  //disable scroll bar when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const bookRating =
    bookReviews.length > 0
      ? bookReviews
          .filter((review) => review.rating)
          .reduce((sum, review) => sum + review.rating, 0) / bookReviews.length
      : 0;

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen bg-cream-100 text-sm pt-0`}
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
          onClick={() => {
            setWantToRead(!wantToRead);
            addToSavedBooks();
          }}
          variant={wantToRead ? "default" : "outline"}
          className="w-full max-w-[220px] rounded-full bg-olive-green-500 hover:bg-olive-green-400 hover:text-white text-white text-xs"
        >
          {wantToRead ? "Added to List" : "Add to List"}
        </Button>
      </div>

      {/* right side content */}
      <BookDetailsComponent
        currentBook={currentBook}
        bookDetails={bookDetails!}
        bookReviews={bookReviews}
        bookRating={bookRating}
        isLoading={isLoading}
        mutate={mutate}
      />
    </div>
  );
}
