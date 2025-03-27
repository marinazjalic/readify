"use client";

import type React from "react";
import { Pin, BookOpen } from "lucide-react";
import type { DisplayBook } from "@/types";
import { ReadingStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContextMenuItem from "./ContextMenuItem";
import { useUserContext } from "@/context/UserContext";
import { updateSavedBook } from "@/actions/books/updateSavedBook";

interface BookContextMenuProps {
  book: DisplayBook;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenProgressDialog: () => void;
  children: React.ReactNode;
  mutate: () => void;
}

export default function BookContextMenu({
  book,
  isOpen,
  onOpenChange,
  onOpenProgressDialog,
  children,
  mutate,
}: BookContextMenuProps) {
  const { userId } = useUserContext();

  const handlePinBook = async () => {
    await updateSavedBook(book.key, userId, {
      isPinned: !book.savedInfo?.isPinned,
    });
    mutate();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handlePinBook}>
          <Pin className="mr-2 h-4 w-4" />
          {book.savedInfo?.isPinned ? "Unpin" : "Pin"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BookOpen className="mr-2 h-4 w-4" />
            Move to...
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <ContextMenuItem
              book={book}
              readingStatus={ReadingStatus.IN_PROGRESS}
              statusText="Currently Reading"
              mutate={mutate}
            />
            <ContextMenuItem
              book={book}
              readingStatus={ReadingStatus.TO_READ}
              statusText="Want to Read"
              mutate={mutate}
            />
            <ContextMenuItem
              book={book}
              readingStatus={ReadingStatus.COMPLETED}
              statusText="Read"
              mutate={mutate}
            />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onOpenProgressDialog}>
          Update Progress
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
