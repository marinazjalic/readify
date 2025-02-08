"use client";

import Image from "next/image";
import type { Book } from "@prisma/client";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function BookDisplay({ books }: { books: Book[] }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-sm font-light mb-4 text-gray-500">
        {books.length} results
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books.map((book: Book) => (
          <div
            key={book.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <div className="relative h-48 w-full">
              <Image
                src={`/assets/${book.id}.jpg`}
                alt={`Cover of ${book.title}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
            </div>
            <div className="p-2">
              <h2 className="font-semibold text-sm mb-1 line-clamp-2">
                {book.title}
              </h2>
              <p className="text-gray-600 text-xs">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
