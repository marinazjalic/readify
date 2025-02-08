import getAllBooks from "@/actions/books/getAllBooks";
import BookDisplay from "./book-display";

export default async function Books() {
  const books = await getAllBooks();

  return (
    <div className="bg-white min-h-screen">
      <BookDisplay books={books} />
    </div>
  );
}
