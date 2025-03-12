"use client";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { DisplayBook } from "@/types";
import BookScrollDisplay from "@/components/books/BookScrollDisplay";
import { Button } from "@/components/ui/button";
import { ReadingStatus } from "@prisma/client";

export default function SavedBooks() {
  const { data: session } = useSession();
  const [savedBooks, setSavedBooks] = useState<DisplayBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookshelf, setCurrentBookShelf] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<DisplayBook[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      setCurrentBookShelf("ALL");
      const fetchSavedBooks = async () => {
        try {
          const books = await getSavedBooksByUser(session.user.id);
          if (books) {
            setSavedBooks(books);
            setFilteredBooks(books);
          }
        } catch (error) {
          console.error("Error fetching saved books:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSavedBooks();
    }
  }, [session]);

  /* keep track of currently selected bookshelf for filtering/styling */

  const handleButtonClicked = (readingStatus: string) => {
    setCurrentBookShelf(readingStatus);
    if (readingStatus in ReadingStatus) {
      setFilteredBooks(
        savedBooks.filter((book) => book.savedInfo!.status === readingStatus)
      );
    }
  };

  const getButtonClass = (readingStatus: string) => {
    const baseClass =
      "bg-white text-gray-500 text-xs h-auto min-h-0 p-0 shadow-none hover:bg-white";
    const activeClass =
      "bg-white text-olive-green-500 text-xs h-auto min-h-0 p-0 shadow-none hover:bg-white border-b-2 rounded-none border-olive-green-500 hover:text-olive-green-500";

    return currentBookshelf === readingStatus
      ? `${baseClass} ${activeClass}`
      : baseClass;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white py-3 mx-2 sm:mx-4 md:mx-5 rounded-lg shadow-md">
        <h3 className="text-base sm:text-lg font-medium px-4 sm:px-6 md:px-8 mb-2 sm:mb-3">
          Currently Reading
        </h3>
        <BookScrollDisplay
          savedBooks={savedBooks.filter(
            (book) => book.savedInfo!.status === ReadingStatus.IN_PROGRESS
          )}
          showProgress={true}
        />
      </div>

      <div className="bg-white py-3 sm:py-4 md:py-5 mx-2 sm:mx-4 md:mx-5 rounded-lg shadow-md mt-3 sm:mt-4 md:mt-5">
        <div className="px-4 sm:px-6 md:px-8">
          <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
            Your Bookshelves
          </h3>
          <div className="flex flex-row text-xxs gap-2 mb-2">
            <Button
              variant="ghost"
              className={getButtonClass("ALL")}
              onClick={() => handleButtonClicked("ALL")}
            >
              All
            </Button>
            <Button
              variant="ghost"
              className={getButtonClass(ReadingStatus.TO_READ)}
              onClick={() => handleButtonClicked(ReadingStatus.TO_READ)}
            >
              Want to Read
            </Button>
            <Button
              variant="ghost"
              className={getButtonClass(ReadingStatus.COMPLETED)}
              onClick={() => handleButtonClicked(ReadingStatus.COMPLETED)}
            >
              Read
            </Button>
          </div>
        </div>
        <BookScrollDisplay savedBooks={filteredBooks} showProgress={false} />
      </div>
    </div>
  );
}
