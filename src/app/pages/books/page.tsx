"use client";

import BookDisplay from "@/components/BookDisplay";
import { searchBooksByQuery } from "@/actions/books/searchBooksByQuery";
import { useState, useEffect } from "react";
import { BookDetails } from "@/types";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { DisplayBook } from "@/types";

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <br />
      {isLoading && <LoadingSpinner />}
      <div className="bg-white min-h-screen">
        <BookDisplay
          //mapping to type DisplayBook
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
    </div>
  );
}
