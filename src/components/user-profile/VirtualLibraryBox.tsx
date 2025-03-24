import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Lora } from "next/font/google";
import { ReadingStatus } from "@prisma/client";
import { useUserContext } from "@/context/UserContext";

const lora = Lora({ subsets: ["latin"] });

export default function VirtualLibrary() {
  const { savedBooks } = useUserContext();
  return (
    <div>
      <div className="py-4 px-4 border-b border-olive-green-100">
        <div className="flex items-center gap-2 border-l-4 border-olive-green-500 pl-2 mb-3">
          <BookOpen className="h-5 w-5 text-olive-green-500" />
          <h3
            className={`${lora.className} text-sm text-olive-green-500 uppercase tracking-wide`}
          >
            Virtual Library
          </h3>
        </div>

        <div className="flex items-start">
          <div className="flex flex-col text-xs ml-3 space-y-0.5">
            <Link
              href="/"
              className="text-gray-500 hover:text-teracota-500 transition-colors flex items-center"
            >
              <span className="text-xs mr-2">
                {savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.TO_READ
                ).length || 0}
              </span>
              <span>Want to Read</span>
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-teracota-500 transition-colors flex items-center"
            >
              <span className="font-medium mr-2">
                {savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.IN_PROGRESS
                ).length || 0}
              </span>
              <span>Currently Reading</span>
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-teracota-500 transition-colors flex items-center"
            >
              <span className="font-medium mr-2">
                {savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
                ).length || 0}
              </span>
              <span>Read</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
