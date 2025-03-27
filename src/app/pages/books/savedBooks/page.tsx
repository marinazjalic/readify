"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { ChevronRight } from "lucide-react";
import { DisplayBook } from "@/types";
import { ReadingStatus } from "@prisma/client";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import { Button } from "@/components/ui/button";
import BookshelfDisplay from "@/components/virtual-lib/BookshelfDisplay";
import BookshelfButton from "@/components/virtual-lib/BookshelfButton";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function SavedBooks() {
  const { data: session } = useSession();
  const [savedBooks, setSavedBooks] = useState<DisplayBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState<DisplayBook[]>([]);
  const [currentBookshelf, setCurrentBookShelf] = useState("ALL"); //default: display all books
  const [showViewButton, setShowViewButton] = useState(false);
  const [showAllBooks, setShowAllBooks] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSavedBooks(session.user.id);
    }
  }, [session]);

  const fetchSavedBooks = async (userId: string) => {
    const books = await getSavedBooksByUser(userId);

    if (books) {
      //display pinned books at the beginning
      const pinned = books?.filter((book) => book.savedInfo?.isPinned) || [];
      const unpinned = books?.filter((book) => !book.savedInfo?.isPinned) || [];
      const allBooks = [...pinned, ...unpinned];

      setSavedBooks(books);
      setFilteredBooks(allBooks);
      setIsLoading(false);
    }
  };

  const currentlyReadingBooks = savedBooks.filter(
    (book) => book.savedInfo!.status === ReadingStatus.IN_PROGRESS
  );

  const handleSelectBookshelf = (readingStatus: string) => {
    setCurrentBookShelf(readingStatus);
    if (readingStatus in ReadingStatus) {
      setFilteredBooks(
        savedBooks.filter((book) => book.savedInfo!.status === readingStatus)
      );
    } else setFilteredBooks(savedBooks);
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
        />
      </div>

      <div className="bg-white sm:py-3 md:py-3 mx-2 sm:mx-4 md:mx-5 shadow-md mb-4">
        <div className="px-4 sm:px-6 md:px-8">
          <h3
            className={`${montserrat.className} text-base sm:text-lg font-medium mb-2 sm:mb-3 text-navy-500`}
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
                className="text-olive-green-500 hover:text-olive-green-600 flex items-center text-xs ml-auto"
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
          />
        </div>
      </div>
    </div>
  );
}
