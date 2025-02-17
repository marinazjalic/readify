"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookByKey } from "@/actions/books/getBookByKey";
import { useBookStore } from "@/lib/bookStore";

const montserrat = Montserrat({ subsets: ["latin"] });

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(value)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function BookDetails({ params }: { params: { id: string } }) {
  const [wantToRead, setWantToRead] = useState(false);
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentBook = useBookStore((state) => state.currentBook);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (currentBook) {
        try {
          const details = await getBookByKey(currentBook.key, currentBook);
          setBookDetails(details);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch book details. Error: ", error);
        }
      }
    };
    fetchBookDetails();
  }, [currentBook]);

  return (
    <div className={`flex min-h-screen bg-white text-sm pt-0`}>
      <div className="w-1/4 fixed left-0 top-[120px] bottom-0 p-4 flex flex-col items-center space-y-4 overflow-y-auto">
        <div className="w-49">
          <Image
            src={`https://covers.openlibrary.org/b/id/${currentBook?.cover}-L.jpg`}
            alt={`Cover of ${currentBook?.title}`}
            width={220}
            height={320}
            className="shadow-lg"
          />
        </div>
        <Button
          onClick={() => setWantToRead(!wantToRead)}
          variant={wantToRead ? "default" : "outline"}
          className="w-60 rounded-full bg-forest-green hover:bg-forest-green-dark text-white text-xs"
        >
          {wantToRead ? "Added to List" : "Want to Read"}
        </Button>
      </div>
      <div className="w-3/4 ml-[25%] p-4 overflow-y-auto min-h-screen">
        <h1 className="text-2xl font-bold mb-1">{currentBook?.title}</h1>
        <p className="text-base text-gray-600 mb-2">by {currentBook?.author}</p>

        {/* <div className="flex items-center mb-3">
          {" "}
          //handle ratings later
          <StarRating value={book.rating} />
          <span className="ml-2 text-sm">
            {book.rating.toFixed(1)} ({Math.floor(book.rating * 20)}%)
          </span>
        </div> */}

        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : bookDetails && bookDetails.description ? (
            <p className="text-sm leading-relaxed mb-4">
              {bookDetails.description}
            </p>
          ) : (
            <p>No description available.</p>
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
