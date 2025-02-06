import BookCard from "./BookCard"

export default function BookRow({ books = [], title }) {
  if (!books || books.length === 0) {
    return null
  }

  return (
    (<div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>)
  );
}

