"use client";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { DisplayBook } from "@/types";
import BookScrollDisplay from "@/components/books/BookScrollDisplay";

export default function SavedBooks() {
  const { data: session } = useSession();
  const [savedBooks, setSavedBooks] = useState<DisplayBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      const fetchSavedBooks = async () => {
        try {
          const books = await getSavedBooksByUser(session.user.id);
          if (books) {
            setSavedBooks(books);
          }
        } catch (error) {
          console.error("Error fetching saved books:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSavedBooks();
    }
  }, [session]);

  return (
    <div className="bg-white mt-4">
      <h3 className="text-gray-600 ml-8 mb-3">Currently Reading</h3>
      <BookScrollDisplay savedBooks={savedBooks} />
    </div>
  );
}
