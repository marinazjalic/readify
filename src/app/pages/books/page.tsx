"use client";

import getAllBooks from "@/actions/books/getAllBooks";
import BookDisplay from "./book-display";
import { searchBooksByQuery } from "@/actions/books/searchBooksByQuery";
import { useState, useEffect } from "react";
import { BookDetails } from "@/types";
import { useSearchParams } from "next/navigation";

export default function Books() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "title";
  const query = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await searchBooksByQuery(filter, query, currentPage);
        setBooks(result.books);
        setTotalPages(Math.ceil(result.total / 20));
      } catch (error) {
        console.error("Failed to fetch books:", error);
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
      <div className="bg-white min-h-screen">
        <BookDisplay
          books={books}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
