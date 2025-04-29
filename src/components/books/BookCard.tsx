import Image from "next/image";
import { BookDetails, DisplayBook } from "@/types";
import { useRouter } from "next/navigation";
import { useBookStore } from "@/lib/bookStore";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { addSavedBook } from "@/actions/books/addSavedBook";
import { deleteSavedBook } from "@/actions/books/deleteSavedBook";

interface BookCardProps {
  book: DisplayBook;
  enableSaving: boolean;
}

export default function BookCard({ book, enableSaving }: BookCardProps) {
  const router = useRouter();
  const setCurrentBook = useBookStore((state) => state.setCurrentBook);
  const setCompleteObj = useBookStore((state) => state.setCompleteObj);
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set());
  const { data: session } = useSession();

  const addToSavedBooks = async (
    bookKey: string,
    userId: string,
    newSet: Set<string>
  ) => {
    const result = await addSavedBook(bookKey, userId);
    if (result.success) {
      newSet.add(bookKey);
      setLikedBooks(newSet);
    } else if (!result.success && result.error?.statusCode === 409) {
      console.log(result.error?.message);
    }
  };

  const deleteSavedBooks = async (
    bookKey: string,
    userId: string,
    newSet: Set<string>
  ) => {
    const result = await deleteSavedBook(bookKey, userId);
    if (result.success) {
      newSet.delete(bookKey);
      setLikedBooks(newSet);
    } else {
      console.log("Error: Something went wrong");
    }
  };

  //only authenticated users can favourite books
  const handleLike = async (bookKey: string) => {
    if (session) {
      const newSet = new Set(likedBooks);
      console.log(newSet);
      if (newSet.has(bookKey)) {
        deleteSavedBooks(bookKey, session.user.id, newSet);
      } else {
        addToSavedBooks(bookKey, session.user.id, newSet);
      }
    } else {
      router.push("./login");
    }
  };
  const handleCoverClick = (book: BookDetails) => {
    setCurrentBook(book);
    setCompleteObj(false);
    router.push(`/pages/books/${book.key}`);
  };
  return (
    <div
      key={book.key}
      className="border overflow-hidden shadow-sm relative group"
    >
      <div className="relative h-60 w-full bg-gray-100">
        <Image
          src={
            book.cover
              ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
              : "/assets/unknown-book-icon.png"
          }
          alt={`Cover of ${book.title}`}
          fill
          style={book.cover ? { objectFit: "contain" } : { objectFit: "cover" }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          onClick={() => handleCoverClick(book)}
        />
      </div>

      {/* enable 'favouring feature' only when not displaying saved books*/}
      {enableSaving && (
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
      )}

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
  );
}
