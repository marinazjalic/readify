import Image from "next/image"

// Small dataset for the preview
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "https://example.com/mockingbird.jpg" },
  { id: 2, title: "1984", author: "George Orwell", coverUrl: "https://example.com/1984.jpg" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "https://example.com/pride.jpg" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverUrl: "https://example.com/gatsby.jpg" },
]

export default function BookDisplay() {


  
  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src={book.coverUrl || "/placeholder.svg"}
                alt={`Cover of ${book.title}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-1">{book.title}</h2>
              <p className="text-gray-700 text-sm">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>)
  );
}

