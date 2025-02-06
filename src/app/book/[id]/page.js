import { Montserrat } from "next/font/google";
// import BookCover from "@/components/BookCover"
// import WantToReadButton from "@/components/WantToReadButton"
// import StarRating from "@/components/StarRating"

import BookCover from "../../../components/book/BookCover";
import WantToReadButton from "../../../components/WantToReadButton";
import StarRating from "../../../components/StarRating";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function BookDetails({ params }) {
  const book = {
    id: params.id,
    title: "The Great Gatsby",
    coverUrl: "/placeholder.svg?height=600&width=400",
    author: "F. Scott Fitzgerald",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    rating: 4.2,
  };

  return (
    <div className={`flex min-h-screen bg-white ${montserrat.className}`}>
      <div className="w-1/3 p-8 flex flex-col items-center space-y-6 overflow-hidden">
        <BookCover book={book} />
        <WantToReadButton />
        <StarRating editable />
      </div>
      <div className="w-2/3 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-1">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
        <div className="mb-4">
          <StarRating value={book.rating} />
        </div>
        <p className="text-sm text-gray-700 mb-4">{book.description}</p>
      </div>
    </div>
  );
}
