import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1) ||
      (currentPage <= 3 && i <= maxVisiblePages) ||
      (currentPage >= totalPages - 2 && i >= totalPages - maxVisiblePages + 1)
    ) {
      pageNumbers.push(i);
    } else if (
      (currentPage > 3 && i === 2) ||
      (currentPage < totalPages - 2 && i === totalPages - 1)
    ) {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <div className="flex items-center space-x-1">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageNumbers.map((number, index) => (
          <React.Fragment key={index}>
            {number === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <Button
                onClick={() => onPageChange(number as number)}
                variant={currentPage === number ? "default" : "ghost"}
                className={`w-8 h-8 p-0 ${
                  currentPage === number
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {number}
              </Button>
            )}
          </React.Fragment>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <br />
    </div>
  );
};

export default Pagination;
