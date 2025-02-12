"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { BookDetails } from "@/types";
import { useRouter } from "next/navigation";
import { useBookStore } from "@/lib/bookStore";
import { Heart } from "lucide-react";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function BookDisplay({ books }: { books: BookDetails[] }) {
  const router = useRouter();
  const setCurrentBook = useBookStore((state) => state.setCurrentBook);
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set());

  const handleCoverClick = (book: BookDetails) => {
    setCurrentBook(book);
    router.push(`/book/${book.key}`);
  };

  //temp logic - only authenticated users can favourite books
  const handleLike = (bookKey: string) => {
    setLikedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookKey)) {
        newSet.delete(bookKey);
      } else {
        newSet.add(bookKey);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-sm font-light mb-4 text-gray-500">
        {books.length} results
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book: BookDetails) => (
          <div
            key={book.key}
            className="border overflow-hidden shadow-sm relative group"
          >
            <div className="relative h-60 w-full bg-gray-100">
              <Image
                src={
                  book.cover
                    ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
                    : "/assets/book-icon.jpg"
                }
                alt={`Cover of ${book.title}`}
                fill
                style={
                  book.cover ? { objectFit: "contain" } : { objectFit: "cover" }
                }
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                onClick={() => handleCoverClick(book)}
              />
            </div>
            <div
              className={`absolute top-2 right-2 transition-opacity ${
                likedBooks.has(book.key)
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Heart
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  likedBooks.has(book.key)
                    ? "text-red-500 fill-red-500"
                    : "text-red-500 hover:fill-red-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(book.key);
                }}
              />
            </div>

            <div className="p-2">
              <h2 className="font-semibold text-xs mb-1 line-clamp-2">
                {book.title}
              </h2>
              <p className="text-gray-600 text-xs">
                {book.author.slice(0, 3).join(", ")}
                {book.author.length > 3 && ", and others"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
