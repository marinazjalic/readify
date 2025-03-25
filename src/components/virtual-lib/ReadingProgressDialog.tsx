"use client";

import type React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DisplayBook } from "@/types";

interface ReadingProgressDialogProps {
  dialogOpen: boolean;
  selectedBook: DisplayBook | null;
  currentPage: number;
  initialCurrentPage: number;
  initialTotalPages: string;
  totalPages: string;
  errorMessage: string;
  onCurrentPageChange: (value: number) => void;
  onTotalPageChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ReadingProgressDialog({
  dialogOpen,
  selectedBook,
  currentPage,
  initialCurrentPage,
  initialTotalPages,
  totalPages,
  errorMessage,
  onCurrentPageChange,
  onTotalPageChange,
  onSave,
  onCancel,
}: ReadingProgressDialogProps) {
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(dialogOpen) => !dialogOpen && onCancel()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Reading Progress</DialogTitle>
          {selectedBook && (
            <p className="text-sm text-gray-500 mt-1">{selectedBook.title}</p>
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
                placeholder={currentPage.toString()}
                value={currentPage}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value);
                  onCurrentPageChange(isNaN(value) ? 0 : value);
                }}
                className="w-20 h-6"
              />
              <p>/</p>
              <Input
                id="totalPages"
                type="text"
                placeholder={totalPages || "Total pages"}
                value={totalPages}
                onChange={(e) => onTotalPageChange(e.target.value)}
                className="w-20 h-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          {errorMessage ? (
            <div className="flex items-center text-red-500 text-xxs">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errorMessage}</p>
            </div>
          ) : currentPage >
            (Number.parseInt(totalPages || initialTotalPages) || 0) ? (
            <p className="text-xxs text-red-500">
              Current page cannot exceed total pages.
            </p>
          ) : !totalPages && !initialTotalPages ? (
            <p className="text-xxs text-red-500">
              Please input the total page count.
            </p>
          ) : (
            <div className="text-xxs text-gray-500">
              {currentPage !== initialCurrentPage ||
              (totalPages !== initialTotalPages && totalPages !== "")
                ? "Changes will be saved"
                : "No changes detected"}
            </div>
          )}
          <div className="flex space-x-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onSave}
              className="bg-olive-green-500 hover:bg-olive-green-600"
              size="sm"
              disabled={
                (!totalPages && !initialTotalPages) ||
                errorMessage !== "" ||
                currentPage >
                  (Number.parseInt(totalPages || initialTotalPages) || 0)
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
