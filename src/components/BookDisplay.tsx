"use client";

import { BookDetails } from "@/types";
import Pagination from "@/components/Pagination";
import BookGrid from "./BookGrid";

interface BookDisplayProps {
  books: BookDetails[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  query: string;
  isLoading: boolean;
}

export default function BookDisplay({
  books,
  currentPage,
  totalPages,
  onPageChange,
  query,
  isLoading,
}: BookDisplayProps) {
  return (
    <div className="container mx-auto">
      <h1 className="text-sm font-light mb-4 text-gray-500">
        Displaying results for '<i>{query}</i> ':
      </h1>

      {!isLoading && <BookGrid books={books} enableSaving={true} />}

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
