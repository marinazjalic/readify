import getAllBooks from "@/actions/books/getAllBooks";
import BookDisplay from "./book-display";

export default async function Books() {
  const books = await getAllBooks();

  return <BookDisplay books={books} />;
}
