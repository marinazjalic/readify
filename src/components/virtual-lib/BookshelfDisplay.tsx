"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { BookOpen, Pin, Loader2 } from "lucide-react";
import type { DisplayBook } from "@/types";
import Image from "next/image";
import BookContextMenu from "./BookContextMenu";
import ProgressDialog from "./ProgressDialog";

interface BookshelfDisplayProps {
  bookList: DisplayBook[];
  showProgressBar: boolean;
  isLoading?: boolean;
  onViewButtonVisibilityChange: (isVisible: boolean) => void;
  showAllBooks?: boolean;
  mutate: () => void;
}

export default function BookshelfDisplay({
  bookList,
  showProgressBar,
  isLoading,
  onViewButtonVisibilityChange,
  showAllBooks = false,
  mutate,
}: BookshelfDisplayProps) {
  const BOOK_WIDTH = 144;
  const MIN_VISIBLE_BOOKS = 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleBooks, setVisibleBooks] = useState<DisplayBook[]>([]);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<DisplayBook | null>(null);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);

  const calculateVisibleBooks = () => {
    const containerWidth = containerRef.current?.clientWidth;
    if (!containerWidth) return;

    const booksToShow = Math.min(
      Math.max(Math.floor(containerWidth / BOOK_WIDTH), MIN_VISIBLE_BOOKS),
      bookList.length
    );

    setVisibleBooks(
      bookList.slice(0, showAllBooks ? bookList.length : booksToShow)
    );

    const shouldShowViewButton = booksToShow < bookList.length;
    onViewButtonVisibilityChange(shouldShowViewButton);
  };

  useEffect(() => {
    const onResize = () => requestAnimationFrame(calculateVisibleBooks);

    calculateVisibleBooks();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [bookList, showAllBooks, onViewButtonVisibilityChange]);

  useEffect(() => {
    calculateVisibleBooks();
  }, [showAllBooks, bookList.length]);

  const getProgressPercentage = (book: DisplayBook): number => {
    const progress = book.savedInfo?.progress || 0;
    const pageCount = book.savedInfo?.pageCount || 0;

    if (pageCount <= 0) return 0;
    return Math.min(Math.round((progress / pageCount) * 100), 100);
  };

  const handleRightClick = (e: React.MouseEvent, book: DisplayBook) => {
    e.preventDefault();
    setSelectedBook(book);
    setContextMenuOpen(true);
  };

  const handleOpenProgressDialog = () => {
    setProgressDialogOpen(true);
  };

  return (
    <div className={`w-full `}>
      <div
        ref={containerRef}
        className="relative w-full h-[200px] overflow-hidden"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Loader2 className="h-8 w-8 text-olive-green-400 animate-spin" />
          </div>
        ) : (
          <div
            className={`flex ${
              showAllBooks ? "flex-wrap gap-4" : "space-x-4"
            } h-full items-center`}
          >
            {visibleBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <BookOpen className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No books currently being read</p>
              </div>
            ) : (
              visibleBooks.map((book) => (
                <BookContextMenu
                  key={book.key}
                  book={book}
                  isOpen={contextMenuOpen && selectedBook?.key === book.key}
                  onOpenChange={(open) => {
                    if (!open) setContextMenuOpen(false);
                  }}
                  onOpenProgressDialog={handleOpenProgressDialog}
                  mutate={mutate}
                >
                  <div
                    className="flex-shrink-0 cursor-pointer relative"
                    onContextMenu={(e) => handleRightClick(e, book)}
                  >
                    <div className="flex flex-col">
                      <div
                        className={`relative h-44 w-32 bg-white shadow-sm rounded-tr-lg rounded-br-lg`}
                      >
                        {book.savedInfo?.isPinned && (
                          <div className="absolute top-2.5 right-2.5 z-20 bg-aqua text-white rounded-full p-1.5 shadow-md transform translate-x-1/2 -translate-y-1/2">
                            <Pin className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div className="absolute inset-0 ">
                          <Image
                            src={
                              book.cover
                                ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
                                : "/assets/book-icon.jpg"
                            }
                            alt={`Cover of ${book.title}`}
                            fill
                            sizes="(max-width: 768px) 100px, 112px"
                            className="rounded-tr-lg rounded-br-lg shadow-md"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center top",
                            }}
                          />
                        </div>
                      </div>

                      {/* Display progress bar for currently reading */}
                      {showProgressBar && (
                        <div className="bg-gray-300 w-full h-2 rounded-md mt-2">
                          <div
                            className="bg-teracota-500 h-full rounded-md"
                            style={{
                              width: `${getProgressPercentage(book)}%`,
                              maxWidth: "100%",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </BookContextMenu>
              ))
            )}
          </div>
        )}
      </div>

      {selectedBook && (
        <ProgressDialog
          dialogOpen={progressDialogOpen}
          selectedBook={selectedBook}
          onCancel={() => setProgressDialogOpen(false)}
          mutate={mutate}
        />
      )}
    </div>
  );
}
