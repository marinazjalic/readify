"use client";

import { useState, useEffect } from "react";
import { BookDetails, DisplayBook } from "@/types";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { searchBooksByQuery } from "@/actions/books/searchBooksByQuery";
import BookDisplay from "./BookDisplay";

export default function Books() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "title";
  const query = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await searchBooksByQuery(filter, query, currentPage);
        setBooks(result.books);
        setTotalPages(Math.ceil(result.total / 20));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [filter, query, currentPage]);

  //disable the scrollbar when loading
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-cream-100 min-h-screen relative">
      {isLoading ? (
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{ marginTop: "-64px" }}
        >
          <Loader2 className="h-8 w-8 text-olive-green-400 animate-spin" />
        </div>
      ) : (
        <div>
          <br />
          <BookDisplay
            books={
              books.map((book) => ({
                ...book,
                isSaved: false,
              })) as DisplayBook[]
            }
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            query={query}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
