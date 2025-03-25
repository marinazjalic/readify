import { create } from "zustand";
import type { BookDetails } from "@/types";

type BookStore = {
  currentBook: BookDetails | null;
  isCompleteObj: boolean | null;
  setCurrentBook: (book: BookDetails | null) => void;
  setCompleteObj: (isCompleteObj: boolean | null) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  currentBook: null,
  isCompleteObj: null,
  setCurrentBook: (book) => set({ currentBook: book }),
  setCompleteObj: (bool) => set({ isCompleteObj: bool }),
}));
