"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { DisplayBook } from "@/types";
import Image from "next/image";
import { BookOpen } from "lucide-react";

interface BookScrollProps {
  savedBooks: DisplayBook[];
}

export default function BookScrollDisplay({ savedBooks }: BookScrollProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className=" w-full h-[200px] overflow-x-auto px-8">
      <div className="flex space-x-4 h-full items-center scrollbar-hide">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="flex-shrink-0">
              <div className="h-44 w-32 bg-gray-200 animate-pulse rounded-tr-lg rounded-br-lg" />
              <div className="h-2.5 w-full bg-gray-200 animate-pulse rounded-md mt-2" />
            </div>
          ))
        ) : savedBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
            <BookOpen className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No books currently being read</p>
          </div>
        ) : (
          savedBooks.map((book) => (
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
                <div className="bg-gray-300 w-full h-2 rounded-md mt-2">
                  <div
                    className="bg-olive-green-500 h-full rounded-md"
                    style={{
                      width: `${book.savedInfo?.progress || 0}%`,
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
