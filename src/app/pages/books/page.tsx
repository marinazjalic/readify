import getAllBooks from "@/actions/books/getAllBooks";
import BookDisplay from "./book-display";
import { searchBooksByQuery } from "@/actions/books/searchBooksByQuery";

export default async function Books({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query;
  const searchedBooks = await searchBooksByQuery(query);
  return (
    <div className="bg-white min-h-screen">
      <BookDisplay books={searchedBooks} />
    </div>
  );
}
