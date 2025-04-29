import { Suspense } from "react";
import Books from "@/components/books/Books";

export default function BooksPage() {
  return (
    <Suspense fallback={<div> </div>}>
      <Books />
    </Suspense>
  );
}
