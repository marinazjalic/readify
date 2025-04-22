"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { ChevronRight } from "lucide-react";
import { ReadingStatus } from "@prisma/client";
import useSWR, { mutate } from "swr";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import { Button } from "@/components/ui/button";
import BookshelfDisplay from "@/components/virtual-lib/BookshelfDisplay";
import BookshelfButton from "@/components/virtual-lib/BookshelfButton";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function SavedBooks() {
  const { data: session } = useSession();

  const [currentBookshelf, setCurrentBookShelf] = useState("ALL"); //default: display all books
  const [showViewButton, setShowViewButton] = useState(false);
  const [showAllBooks, setShowAllBooks] = useState(false);

  const {
    data: books,
    error,
    isLoading,
    mutate,
  } = useSWR(
    session?.user?.id ? ["saved-books", session.user.id] : null,
    ([_, userId]) => getSavedBooksByUser(userId)
  );

  const savedBooks = useMemo(() => books || [], [books]);

  const allBooks = useMemo(() => {
    const pinned = savedBooks.filter((book) => book.savedInfo?.isPinned) || [];
    const unpinned =
      savedBooks.filter((book) => !book.savedInfo?.isPinned) || [];
    return [...pinned, ...unpinned];
  }, [savedBooks]);

  const filteredBooks = useMemo(() => {
    if (currentBookshelf in ReadingStatus) {
      return savedBooks.filter(
        (book) => book.savedInfo!.status === currentBookshelf
      );
    }
    return allBooks;
  }, [savedBooks, currentBookshelf, allBooks]);

  const currentlyReadingBooks = useMemo(
    () =>
      savedBooks.filter(
        (book) => book.savedInfo!.status === ReadingStatus.IN_PROGRESS
      ),
    [savedBooks]
  );

  const handleSelectBookshelf = (readingStatus: string) => {
    setCurrentBookShelf(readingStatus);
    setShowAllBooks(false);
  };

  return (
    <div className="flex flex-col gap-4 text-gray-600 bg-cream-100">
      <div className="bg-white py-3 mx-2 sm:mx-4 md:mx-5 shadow-md mt-4 relative px-4 sm:px-6 md:px-8">
        <h3
          className={`${montserrat.className} text-navy-500 text-base sm:text-lg font-medium  mb-0 sm:mb-3 z-10`}
        >
          Currently Reading
        </h3>

        <BookshelfDisplay
          bookList={currentlyReadingBooks}
          showProgressBar={true}
          isLoading={isLoading}
          onViewButtonVisibilityChange={(isVisible) =>
            setShowViewButton(isVisible)
          }
          showAllBooks={showAllBooks}
          mutate={mutate}
        />
      </div>

      <div className="bg-white mx-2 sm:mx-4 md:mx-5 shadow-md">
        <div className="px-4 sm:px-6 md:px-8">
          <h3
            className={`${montserrat.className} text-base sm:text-lg font-medium mb-2 pt-4 text-navy-500`}
          >
            Your Bookshelves
          </h3>

          <div className="flex flex-row text-xxs gap-2 ml-0.5">
            <BookshelfButton
              currentlySelectedShelf={currentBookshelf}
              bookshelfTitle="All Books"
              bookshelfStatus="ALL"
              onSelectBookshelf={handleSelectBookshelf}
            />
            <BookshelfButton
              currentlySelectedShelf={currentBookshelf}
              bookshelfTitle="Want to Read"
              bookshelfStatus={ReadingStatus.TO_READ}
              onSelectBookshelf={handleSelectBookshelf}
            />
            <BookshelfButton
              currentlySelectedShelf={currentBookshelf}
              bookshelfTitle="Completed"
              bookshelfStatus={ReadingStatus.COMPLETED}
              onSelectBookshelf={handleSelectBookshelf}
            />
            {showViewButton && !showAllBooks && (
              <Button
                variant="ghost"
                size="sm"
                className="text-olive-green-500 hover:text-olive-green-600 hover:bg-white hover:text-opacity-75 flex items-center text-xs ml-auto h-5"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

          <BookshelfDisplay
            bookList={filteredBooks}
            showProgressBar={false}
            isLoading={isLoading}
            onViewButtonVisibilityChange={(isVisible) =>
              setShowViewButton(isVisible)
            }
            showAllBooks={showAllBooks}
            mutate={mutate}
          />
        </div>
      </div>
    </div>
  );
}
