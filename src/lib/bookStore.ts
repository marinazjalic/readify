import { create } from "zustand";
import type { BookDetails } from "@/types";

type BookStore = {
  currentBook: BookDetails | null;
  setCurrentBook: (book: BookDetails | null) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  currentBook: null,
  setCurrentBook: (book) => set({ currentBook: book }),
}));
