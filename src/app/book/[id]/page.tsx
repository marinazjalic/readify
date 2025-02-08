import { Montserrat } from "next/font/google";
import WantToReadButton from "@/components/WantToReadButton";
import StarRating from "@/components/StarRating";
// import BookCover from "@/components/book/BookCover";
import { getBookById } from "@/actions/books/getBookById";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBookById(params.id);

  return (
    <div className={`flex min-h-screen bg-white ${montserrat.className}`}>
      <div className="w-1/3 p-8 flex flex-col items-center space-y-6 overflow-hidden">
        {/* {book && <BookCover bookId={book.id} />} */}
        <WantToReadButton />
        <StarRating editable />
      </div>
      <div className="w-2/3 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-1">{book?.title || "Title"}</h1>
        <p className="text-lg text-gray-600 mb-2">
          by {book?.author || "Author"}
        </p>
        <div className="mb-4">
          <StarRating value={book?.rating || 0} />
        </div>
        <p className="text-sm text-gray-700 mb-4">
          {book?.description || "Description"}
        </p>
      </div>
    </div>
  );
}
