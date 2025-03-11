import { DisplayBook } from "@/types";
import BookCard from "./BookCard";

interface GridProps {
  books: DisplayBook[];
  enableSaving: boolean;
}

export default function BookGrid({ books, enableSaving }: GridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {books.map((book: DisplayBook) => (
        <BookCard key={book.key} book={book} enableSaving={enableSaving} />
      ))}
    </div>
  );
}
