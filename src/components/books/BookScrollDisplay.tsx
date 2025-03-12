"use client";

import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import type { DisplayBook } from "@/types";
import Image from "next/image";
import { BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookScrollProps {
  savedBooks: DisplayBook[];
  showProgress: boolean;
}

export default function BookScrollDisplay({
  savedBooks,
  showProgress,
}: BookScrollProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleBooks, setVisibleBooks] = useState<DisplayBook[]>([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Book width including margin
  const BOOK_WIDTH = 144; // 32px width + 4px margin on each side
  const MIN_VISIBLE_BOOKS = 3;

  useEffect(() => {
    const calculateVisibleBooks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      let booksToShow = Math.floor(containerWidth / BOOK_WIDTH);

      // Ensure we show at least MIN_VISIBLE_BOOKS
      booksToShow = Math.max(booksToShow, MIN_VISIBLE_BOOKS);

      // Ensure we don't show more books than we have
      booksToShow = Math.min(booksToShow, savedBooks.length);

      setVisibleBooks(
        savedBooks.slice(0, showAllBooks ? savedBooks.length : booksToShow)
      );
    };

    calculateVisibleBooks();

    // Recalculate on window resize
    window.addEventListener("resize", calculateVisibleBooks);
    return () => window.removeEventListener("resize", calculateVisibleBooks);
  }, [savedBooks, showAllBooks]);

  const handleViewAll = () => {
    setShowAllBooks(true);
  };

  const handleViewLess = () => {
    setShowAllBooks(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <div
        ref={containerRef}
        className="relative w-full h-[200px] overflow-hidden"
      >
        <div
          className={`flex ${
            showAllBooks ? "flex-wrap gap-4" : "space-x-4"
          } h-full items-center`}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex-shrink-0">
                <div className="h-44 w-32 bg-gray-200 animate-pulse rounded-tr-lg rounded-br-lg" />
                <div className="h-2.5 w-full bg-gray-200 animate-pulse rounded-md mt-2" />
              </div>
            ))
          ) : visibleBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
              <BookOpen className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No books currently being read</p>
            </div>
          ) : (
            visibleBooks.map((book) => (
              <div
                key={book.key}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => console.log(`Clicked book: ${book.title}`)}
              >
                {/* Book cover container */}
                <div className="flex flex-col">
                  <div className="relative h-44 w-32 bg-white shadow-sm rounded-tr-lg rounded-br-lg overflow-hidden border">
                    <div className="absolute inset-0 bg-gray-100">
                      <Image
                        src={
                          book.cover
                            ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
                            : "/assets/book-icon.jpg"
                        }
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="(max-width: 768px) 100px, 112px"
                        className="rounded-tr-lg rounded-br-lg"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center top",
                        }}
                      />
                    </div>
                  </div>

                  {/* progress bar */}
                  {showProgress && (
                    <div className="bg-gray-300 w-full h-2 rounded-md mt-2">
                      <div
                        className="bg-olive-green-500 h-full rounded-md"
                        style={{
                          width: `${book.savedInfo?.progress || 0}%`,
                          maxWidth: "100%",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View All / View Less button */}
      {savedBooks.length > visibleBooks.length && !showAllBooks && (
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-olive-green-500 hover:text-olive-green-600 flex items-center text-xs"
            onClick={handleViewAll}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {showAllBooks && (
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-olive-green-500 hover:text-olive-green-600 text-xs"
            onClick={handleViewLess}
          >
            View Less
          </Button>
        </div>
      )}
    </div>
  );
}
