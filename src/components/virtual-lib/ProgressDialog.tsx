"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ActivityType } from "@prisma/client";
import { DisplayBook } from "@/types";
import { createActivity } from "@/actions/activity/createActivity";
import { updateSavedBook } from "@/actions/books/updateSavedBook";
import { useUserContext } from "@/context/UserContext";

interface ProgressDialogProps {
  dialogOpen: boolean;
  selectedBook: DisplayBook;
  onCancel: () => void;
}

export default function ProgressDialog({
  dialogOpen,
  selectedBook,
  onCancel,
}: ProgressDialogProps) {
  const { progress, pageCount } = selectedBook.savedInfo!;
  const [currentPage, setCurrentPage] = useState(progress);
  const [totalPages, setTotalPages] = useState(String(pageCount));
  const { userId } = useUserContext();
  const { key, title } = selectedBook;

  const getErrorMessage = () => {
    if (currentPage > Number(totalPages))
      return "Error: Current page cannot exceed total pages.";
    if (!pageCount || totalPages === "0") {
      return "Please input the total page count.";
    } else {
      return null;
    }
  };

  //reset selection if not saved
  const handleOnOpenChange = () => {
    onCancel();
    setCurrentPage(progress);
    setTotalPages(String(pageCount));
  };

  const handleSaveProgress = async () => {
    onCancel();
    const updateData: { progress?: number; pageCount?: number } = {};

    if (currentPage != progress) {
      updateData.progress = currentPage;
    }

    if (Number(totalPages) != pageCount) {
      updateData.pageCount = Number(totalPages);
    }

    //update in db and create activity for newsfeed
    const result = await updateSavedBook(key, userId, updateData);
    if (result) {
      //fix - fetch saved books to re-render the progress bar
      await createActivity(
        userId,
        ActivityType.UPDATED_PROGRESS,
        key,
        title,
        undefined,
        undefined,
        result.id
      );
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => handleOnOpenChange()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Reading Progress</DialogTitle>
          {selectedBook && (
            <p className="text-sm text-gray-500 mt-1">{title}</p>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex items-center gap-2 text-sm text-gray-600">
              <p>Pages read</p>
              <Input
                id="currentPage"
                type="number"
                min="0"
                placeholder={progress.toString()}
                value={currentPage}
                onChange={(e) => {
                  const newPage = Number(e.target.value);
                  isNaN(newPage) ? setCurrentPage(0) : setCurrentPage(newPage);
                }}
                className="w-20 h-6"
              />
              <p>/</p>
              <Input
                id="totalPages"
                type="text"
                placeholder={totalPages || "Total pages"}
                value={totalPages}
                onChange={(e) => {
                  setTotalPages(e.target.value);
                }}
                className="w-20 h-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          <p className="text-xxs text-red-500">{getErrorMessage()}</p>

          <div className="flex space-x-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSaveProgress}
              className="bg-olive-green-500 hover:bg-olive-green-600"
              size="sm"
              disabled={
                currentPage > Number(totalPages) ||
                !pageCount ||
                totalPages === "0" ||
                (currentPage === progress && Number(totalPages) == pageCount)
              }
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
