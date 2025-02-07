import Image from "next/image";
import { Book } from "@prisma/client";

export default function BookCover({ bookId }: { bookId: string }) {
  return (
    <div className="w-full max-w-xs aspect-[2/3] relative">
      <Image
        src={`/assets/${bookId}.jpg` || "/placeholder.svg"}
        alt={`Cover of ${bookId}`}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 0vw, 33vw"
      />
    </div>
  );
}
