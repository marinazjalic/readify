import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DisplayBook } from "@/types";
import { ActivityType, ReadingStatus } from "@prisma/client";
import { Check } from "lucide-react";
import { updateSavedBook } from "@/actions/books/updateSavedBook";
import { createActivity } from "@/actions/activity/createActivity";
import { useUserContext } from "@/context/UserContext";

interface ContextItemProps {
  readingStatus: ReadingStatus;
  book: DisplayBook;
  statusText: string;
  mutate: () => void;
}

export default function ContextMenuItem({
  book,
  readingStatus,
  statusText,
  mutate,
}: ContextItemProps) {
  const { userId } = useUserContext();

  const handleUpdateStatus = async (newStatus: string) => {
    if (newStatus in ReadingStatus) {
      const updatedBook = await updateSavedBook(book.key, userId, {
        status: newStatus as ReadingStatus,
      });
      if (updatedBook) {
        mutate();
        await createActivity(
          userId,
          ActivityType.UPDATED_STATUS,
          book.key,
          book.title,
          undefined,
          undefined,
          updatedBook.id
        );
      }
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleUpdateStatus(readingStatus)}>
      {book.savedInfo?.status === readingStatus && (
        <Check className="mr-2 h-4 w-4" />
      )}
      <span
        className={
          book.savedInfo?.status === readingStatus ? "font-medium" : ""
        }
      >
        {statusText}
      </span>
    </DropdownMenuItem>
  );
}
