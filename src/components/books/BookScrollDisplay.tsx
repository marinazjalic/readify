"use client";

import type React from "react";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import type { DisplayBook } from "@/types";
import Image from "next/image";
import { BookOpen, ChevronRight, Pin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReadingStatus } from "@prisma/client";

interface BookScrollProps {
  savedBooks: DisplayBook[];
  showProgress: boolean;
  onUpdateStatus?: (bookKey: string, status: string) => void;
  onUpdateProgress?: (bookKey: string, progress: number) => void;
  onPinBook?: (bookKey: string, isPinned: boolean) => void;
}

export default function BookScrollDisplay({
  savedBooks,
  showProgress,
  onUpdateStatus,
  onUpdateProgress,
  onPinBook,
}: BookScrollProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleBooks, setVisibleBooks] = useState<DisplayBook[]>([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Context menu and dialog state
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<DisplayBook | null>(null);
  const [progress, setProgress] = useState<number>(0);

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

  const handleRightClick = (e: React.MouseEvent, book: DisplayBook) => {
    e.preventDefault();
    setSelectedBook(book);
    setContextMenuOpen(true);

    // Set initial progress value if available
    if (book.savedInfo?.progress) {
      setProgress(book.savedInfo.progress);
    } else {
      setProgress(0);
    }
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedBook && onUpdateStatus) {
      onUpdateStatus(selectedBook.key, status);
    }
    setContextMenuOpen(false);
  };

  const handlePinBook = () => {
    if (selectedBook && onPinBook) {
      onPinBook(selectedBook.key, !selectedBook.savedInfo?.isPinned);
    }
    setContextMenuOpen(false);
  };

  const handleOpenProgressDialog = () => {
    setContextMenuOpen(false);
    setProgressDialogOpen(true);
  };

  const handleUpdateProgress = () => {
    if (selectedBook && onUpdateProgress) {
      onUpdateProgress(selectedBook.key, progress);
    }
    setProgressDialogOpen(false);
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
              <DropdownMenu
                key={book.key}
                open={contextMenuOpen && selectedBook?.key === book.key}
                onOpenChange={(open) => {
                  if (!open) setContextMenuOpen(false);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <div
                    className="flex-shrink-0 cursor-pointer relative"
                    onClick={() => console.log(`Clicked book: ${book.title}`)}
                    onContextMenu={(e) => handleRightClick(e, book)}
                  >
                    {/* Book cover container */}
                    <div className="flex flex-col">
                      <div className="relative h-44 w-32 bg-white shadow-sm rounded-tr-lg rounded-br-lg overflow-hidden border">
                        {book.savedInfo?.isPinned && (
                          <div className="absolute top-1 right-1 z-10 bg-olive-green-500 text-white rounded-full p-1">
                            <Pin className="h-3 w-3" />
                          </div>
                        )}
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
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={handlePinBook}>
                    <Pin className="mr-2 h-4 w-4" />
                    {book.savedInfo?.isPinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Move to...
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(ReadingStatus.IN_PROGRESS)
                        }
                      >
                        {book.savedInfo?.status ===
                          ReadingStatus.IN_PROGRESS && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        <span
                          className={
                            book.savedInfo?.status === ReadingStatus.IN_PROGRESS
                              ? "font-medium"
                              : ""
                          }
                        >
                          Currently Reading
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(ReadingStatus.TO_READ)
                        }
                      >
                        {book.savedInfo?.status === ReadingStatus.TO_READ && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        <span
                          className={
                            book.savedInfo?.status === ReadingStatus.TO_READ
                              ? "font-medium"
                              : ""
                          }
                        >
                          Want to Read
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(ReadingStatus.COMPLETED)
                        }
                      >
                        {book.savedInfo?.status === ReadingStatus.COMPLETED && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        <span
                          className={
                            book.savedInfo?.status === ReadingStatus.COMPLETED
                              ? "font-medium"
                              : ""
                          }
                        >
                          Read
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleOpenProgressDialog}>
                    Update Progress
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* Progress Update Dialog */}
      <Dialog open={progressDialogOpen} onOpenChange={setProgressDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Reading Progress</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right">
                Progress
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-20"
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleUpdateProgress}
              className="bg-olive-green-500 hover:bg-olive-green-600"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
