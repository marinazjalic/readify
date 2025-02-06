"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const genres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-help",
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("searching..");
      searchBooks(searchQuery);
    }
  };

  const searchBooks = async (query) => {
    try {
      const response = await fetch(`/api/books/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Error: Failed to find books. ");
      }
      const data = await response.json();
      console.log("search results: ");
      console.log(data);
    } catch (error) {
      throw new Error("Error: Failed to find books. ");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-navy-600">
            Readify
          </Link>
          <div className="flex-grow mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-navy-600 focus:ring-0 focus:outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
          <Button className="bg-navy-600 text-white hover:bg-navy-700">
            Log In
          </Button>
        </div>
        <div className="flex justify-start items-center py-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant="ghost"
              className="text-navy-600 hover:text-navy-800 hover:bg-white relative group px-4"
            >
              {genre}
              <span className="absolute bottom-1 left-0 w-full h-0.5 bg-navy-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
