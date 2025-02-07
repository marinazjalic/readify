"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";

export default function BookDisplay({ books }: { books: Book[] }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [books, setBooks] = useState([]);
  const [bookMap, setBookMap] = useState(new Map());
  const [dataLoaded, setDataLoaded] = useState(false);

  const filterBooksByGenre = async (genre: string) => {
    try {
      const response = await fetch(`/api/books/filter/${genre}`);
      if (!response.ok) {
        throw new Error("Error: Failed to filter books by genre. ");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error("Error: Failed to filter books by genre. ");
    }
  };

  const filterBooks = async (filter: string) => {
    try {
      const response = await fetch(`api/books/filter?filter=${filter}`);
      if (!response.ok) {
        throw new Error("Error: Failed to filter books for carousel. ");
      }
      const data = await response.json();
      console.log("FILTER BOOKS");
      console.log(data);
    } catch (error) {
      throw new Error("Error: Failed to filter books. ");
    }
  };

  // const validateCredentials = async () => {
  //   try {
  //     const loginData = {
  //       email: email,
  //       password: password,
  //     };

  //     const response = await fetch("/api/users/validate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginData),
  //     });
  //     const data = await response.json();
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book: Book) => (
          <div
            key={book.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={"/assets/cover.jpg"}
                alt={`Cover of ${book.title}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-1">
                {book.title}
              </h2>
              <p className="text-gray-700 text-sm">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
