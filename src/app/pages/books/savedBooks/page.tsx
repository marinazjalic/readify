"use client";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DisplayBook } from "@/types";
import BookScrollDisplay from "@/components/books/BookScrollDisplay";
import { Button } from "@/components/ui/button";
import { ReadingStatus } from "@prisma/client";
import { updateSavedBook } from "@/actions/books/updateSavedBook";
import { createActivity } from "@/actions/activity/createActivity";
import { ActivityType } from "@prisma/client";
import { ReferenceType } from "@prisma/client";

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
      fetchSavedBooks();
    }
  }, [session]);

  const fetchSavedBooks = async () => {
    if (!session?.user?.id) return;
    try {
      const books = await getSavedBooksByUser(session.user.id);

      //display pinned books at the beginning
      const pinned = books?.filter((book) => book.savedInfo?.isPinned) || [];
      const unpinned = books?.filter((book) => !book.savedInfo?.isPinned) || [];
      const allBooks = [...pinned, ...unpinned];

      if (books) {
        setSavedBooks(books);
        setFilteredBooks(allBooks);
      }
    } catch (error) {
      console.error("Error fetching saved books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* keep track of currently selected bookshelf for filtering/styling */
  const handleButtonClicked = (readingStatus: string) => {
    setCurrentBookShelf(readingStatus);
    if (readingStatus in ReadingStatus) {
      setFilteredBooks(
        savedBooks.filter((book) => book.savedInfo!.status === readingStatus)
      );
    } else setFilteredBooks(savedBooks);
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

  const handlePinBook = async (bookKey: string, isPinned: boolean) => {
    if (!session?.user?.id) return;

    try {
      await updateSavedBook(bookKey, session.user.id, { isPinned });
      fetchSavedBooks();
    } catch (error) {
      console.error("Error updating book.", error);
    }
  };

  const handleUpdateStatus = async (
    bookKey: string,
    status: string,
    bookTitle: string
  ) => {
    if (!session?.user?.id) return;
    try {
      if (status in ReadingStatus) {
        const result = await updateSavedBook(bookKey, session.user.id, {
          status: status as ReadingStatus,
        });
        if (result) {
          fetchSavedBooks();
          await createActivity(
            session.user.id,
            ActivityType.UPDATED_STATUS,
            bookKey,
            bookTitle,
            undefined,
            undefined,
            result.id
          );
        }
      } else {
        console.error("Invalid reading status:", status);
      }
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  // Combined function to handle both progress and page count updates
  const handleUpdateReadingProgress = async (
    bookKey: string,
    currentPage: number,
    bookTitle: string,
    pageCount?: number
  ) => {
    if (!session?.user?.id) return;

    try {
      const updateData: { progress: number; pageCount?: number } = {
        progress: currentPage,
      };
      if (pageCount !== undefined) {
        updateData.pageCount = pageCount;
      }
      const result = await updateSavedBook(
        bookKey,
        session.user.id,
        updateData
      );
      if (result) {
        fetchSavedBooks();
        await createActivity(
          session.user.id,
          ActivityType.UPDATED_PROGRESS,
          bookKey,
          bookTitle,
          undefined,
          undefined,
          result.id
        );
      }
    } catch (error) {
      console.error("Error updating reading progress:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-gray-600">
      <div className="bg-white py-3 mx-2 sm:mx-4 md:mx-5 rounded-lg shadow-md mt-4">
        <h3 className="text-base sm:text-lg font-medium px-4 sm:px-6 md:px-8 mb-2 sm:mb-3">
          Currently Reading
        </h3>
        <BookScrollDisplay
          savedBooks={savedBooks.filter(
            (book) => book.savedInfo!.status === ReadingStatus.IN_PROGRESS
          )}
          showProgress={true}
          onPinBook={handlePinBook}
          onUpdateStatus={handleUpdateStatus}
          onUpdateProgress={handleUpdateReadingProgress}
        />
      </div>

      <div className="bg-white py-3 sm:py-4 md:py-5 mx-2 sm:mx-4 md:mx-5 rounded-lg shadow-md mt-3 sm:mt-4 md:mt-5">
        <div className="px-4 sm:px-6 md:px-8">
          <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
            Your Bookshelves
          </h3>
          <div className="flex flex-row text-xxs gap-2 mb-2 ml-0.5">
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
        <BookScrollDisplay
          savedBooks={filteredBooks}
          showProgress={false}
          onPinBook={handlePinBook}
          onUpdateStatus={handleUpdateStatus}
          onUpdateProgress={handleUpdateReadingProgress}
        />
      </div>
    </div>
  );
}
