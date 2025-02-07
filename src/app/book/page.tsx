import Image from "next/image";
import getAllBooks from "@/actions/books/getAllBooks";

export default async function BookDisplay() {
  const books = await getAllBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border border-gray-200 shadow-sm">
            <div className="relative h-40 w-full">
              <Image
                src={`/assets/${book.id}.jpg`}
                alt={`Cover of ${book.title}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
              />
            </div>
            <div className="p-2">
              <h2 className="font-semibold text-sm line-clamp-1">
                {book.title}
              </h2>
              <p className="text-gray-600 text-xs mt-1">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
