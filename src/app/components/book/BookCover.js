import Image from "next/image";

export default function BookCover({ book }) {
  return (
    <div className="w-full max-w-xs aspect-[2/3] relative">
      <Image
        src={`/assets/cover.jpg` || "/placeholder.svg"}
        alt={`Cover of ${book.title}`}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 0vw, 33vw"
      />
    </div>
  );
}
