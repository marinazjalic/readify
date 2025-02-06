import Image from "next/image"
import { Card, CardContent } from "../ui/card"

export default function BookCard({ book }) {
  return (
    (<Card className="w-full overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={book.coverUrl || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-sm line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
      </CardContent>
    </Card>)
  );
}

