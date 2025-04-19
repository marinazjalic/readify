import { BookMarked } from "lucide-react";
import { Lora } from "next/font/google";
import { ReadingStatus } from "@prisma/client";
import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Challenge } from "@prisma/client";

const lora = Lora({ subsets: ["latin"] });

interface ChallengeBoxProps {
  isGoalDialogOpen: boolean;
  setIsGoalDialogOpen: (open: boolean) => void;
  challenge: Challenge | undefined;
}
export default function ReadingChallengeBox({
  isGoalDialogOpen,
  setIsGoalDialogOpen,
  challenge,
}: ChallengeBoxProps) {
  const currentYear = new Date().getFullYear();
  const { savedBooks } = useUserContext();
  const [readingGoal, setReadingGoal] = useState(0);

  useEffect(() => {
    if (challenge) {
      setReadingGoal(challenge.goal);
    }
  }, [challenge]);

  const completedBooksCount =
    savedBooks?.filter(
      (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
    ).length || 0;

  const progressPercentage =
    readingGoal !== 0
      ? Math.min(100, (completedBooksCount / readingGoal) * 100)
      : 0;

  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-2 border-l-4 border-olive-green-500 pl-2 mb-3">
        <BookMarked className="h-5 w-5 text-olive-green-500" />
        <h3
          className={`${lora.className} text-sm text-olive-green-500 uppercase tracking-wide`}
        >
          {currentYear} Reading Challenge
        </h3>
      </div>

      <div className=" rounded-md p-3 ">
        <div className="flex items-center mb-3">
          <span className="text-gray-500 text-xs">
            {completedBooksCount} of {readingGoal} books completed
          </span>
        </div>

        <div className="w-full bg-cream-100 h-3 rounded-full mb-3 overflow-hidden border border-olive-green-100">
          <div
            className="bg-teracota-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-olive-green-400">
            {Math.round(progressPercentage)}% complete
          </span>
          <button
            className="text-teracota-500 hover:text-teracota-600 transition-colors font-medium"
            onClick={() => setIsGoalDialogOpen(true)}
          >
            Update goal
          </button>
        </div>
      </div>
    </div>
  );
}
