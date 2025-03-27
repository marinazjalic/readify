import { ReadingStatus } from "@prisma/client";
import { Button } from "../ui/button";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface BookshelfButtonProps {
  currentlySelectedShelf: string;
  bookshelfTitle: string;
  bookshelfStatus: ReadingStatus | string;
  onSelectBookshelf: (readingStatus: string) => void;
}

export default function BookshelfButton({
  currentlySelectedShelf,
  bookshelfTitle,
  bookshelfStatus,
  onSelectBookshelf,
}: BookshelfButtonProps) {
  const getButtonClass = (readingStatus: string) => {
    const baseClass = `bg-white text-gray-500 text-xs h-5 min-h-0 p-0 shadow-none hover:bg-white hover:text-gray-400 ${montserrat.className}`;
    const activeClass =
      "bg-white text-olive-green-500 border-b-2 rounded-none border-olive-green-500 hover:text-olive-green-500";

    return `${baseClass} ${
      currentlySelectedShelf === readingStatus ? activeClass : ""
    }`;
  };

  return (
    <Button
      variant="ghost"
      className={getButtonClass(bookshelfStatus)}
      onClick={() => onSelectBookshelf(bookshelfStatus)}
    >
      {bookshelfTitle}
    </Button>
  );
}
