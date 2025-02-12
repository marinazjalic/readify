import getAllBooks from "@/actions/books/getAllBooks";
import BookDisplay from "./book-display";
import { searchBooksByQuery } from "@/actions/books/searchBooksByQuery";

export default async function Books({
  searchParams,
}: {
  searchParams: { filter: string; query: string };
}) {
  const filter = searchParams.filter;
  const query = searchParams.query;
  const searchedBooks = await searchBooksByQuery(filter, query);
  return (
    <div>
      <br />
      <div className="bg-white min-h-screen">
        <BookDisplay books={searchedBooks} />
      </div>
    </div>
  );
}
