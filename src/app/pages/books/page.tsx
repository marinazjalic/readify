"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";

const books: Book[] = [
  {
    id: "507f1f77bcf86cd799439011",
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    publish_date: new Date("2020-08-13"),
    rating: 4.2,
    genres: ["Fiction", "Fantasy", "Contemporary"],
  },
  {
    id: "507f1f77bcf86cd799439012",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.",
    publish_date: new Date("2021-05-04"),
    rating: 4.8,
    genres: ["Science Fiction", "Space Opera", "Adventure"],
  },
  {
    id: "507f1f77bcf86cd799439013",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    description:
      "A modern love story spanning decades about the power of creativity, games, and connection in unexpected places.",
    publish_date: new Date("2022-07-05"),
    rating: 4.5,
    genres: ["Literary Fiction", "Contemporary", "Romance"],
  },
  {
    id: "507f1f77bcf86cd799439014",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    description:
      "A debut novel about a female chemist in the 1960s who becomes a cooking show host and teaches women to challenge the status quo.",
    publish_date: new Date("2022-04-05"),
    rating: 4.6,
    genres: ["Historical Fiction", "Literary Fiction", "Feminism"],
  },
  {
    id: "507f1f77bcf86cd799439015",
    title: "The Light We Carry",
    author: "Michelle Obama",
    description:
      "Former First Lady Michelle Obama shares practical wisdom and powerful strategies for staying hopeful in difficult times.",
    publish_date: new Date("2022-11-15"),
    rating: 4.7,
    genres: ["Nonfiction", "Memoir", "Self-Help"],
  },
];

export default function BookDisplay() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [books, setBooks] = useState([]);
  const [bookMap, setBookMap] = useState(new Map());
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchBooks = async () => {
    try {
      const response: Response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      const bookIds = data.map((book: { id: string }) => book.id);
      bookMap.set("all", bookIds);
      setBookMap(bookMap);
      setDataLoaded(true);
    } catch (error) {
      throw new Error("Failed to fetch books");
    }
  };

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

  // const loadCarouselData = async () => {
  //   try {
  //     const filters = ['NEW_RELEASES', 'UPCOMING', 'TOP_RATED'];
  //     const promises = filters.map((filter) =>)
  //   }
  // }

  //fix this
  useEffect(() => {
    fetchBooks();
    // filterBooksByGenre("Thriller");
    filterBooks("NEW_RELEASES");
    filterBooks("UPCOMING");
    filterBooks("TOP_RATED");
  }, []);

  const validateCredentials = async () => {
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch("/api/users/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // console.log("parent map", bookMap);

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
