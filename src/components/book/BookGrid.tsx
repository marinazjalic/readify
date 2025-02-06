import BookCard from "./BookCard"

export default function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    (<div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>)
  );
}

