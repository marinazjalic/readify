import type { ReadingStatus } from "@prisma/client";

export type BookDetails = {
  title: string;
  author: string[];
  cover: string;
  key: string;
  publish_date?: string;
  description?: string;
  rating?: number;
  genres?: string[];
};

//unified type for book details and saved book info
export type DisplayBook = BookDetails & {
  isSaved: boolean;
  savedInfo?: {
    id: string;
    status: ReadingStatus;
    progress: number;
    dateAdded: Date;
    dateUpdated: Date;
    isPinned?: boolean;
    pageCount?: number;
  };
};
