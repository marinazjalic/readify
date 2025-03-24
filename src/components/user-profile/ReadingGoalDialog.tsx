import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import { ReadingStatus } from "@prisma/client";

interface GoalDialogProps {
  isGoalDialogOpen: boolean;
  setIsGoalDialogOpen: (open: boolean) => void;
}

export default function ReadingGoalDialog({
  isGoalDialogOpen,
  setIsGoalDialogOpen,
}: GoalDialogProps) {
  const [readingGoal, setReadingGoal] = useState(0);
  const [newGoal, setNewGoal] = useState(readingGoal);
  const currentYear = new Date().getFullYear();
  const { savedBooks } = useUserContext();

  const completedBooksCount =
    savedBooks?.filter(
      (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
    ).length || 0;

  const handleGoalUpdate = () => {
    setReadingGoal(newGoal);
    setIsGoalDialogOpen(false);

    //to-do update in db
  };

  return (
    <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-cream-100 border-olive-green-100">
        <DialogHeader>
          <DialogTitle className="text-navy-600 text-center text-xl font-serif">
            Reading Challenge {currentYear}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <Label
            htmlFor="goal"
            className="text-olive-green-500 text-center block mb-4 font-medium"
          >
            How many books do you want to read in {currentYear}?
          </Label>
          <div className="flex items-center justify-center">
            <Input
              id="goal"
              type="number"
              min="1"
              max="1000"
              value={newGoal}
              onChange={(e) => setNewGoal(Number.parseInt(e.target.value) || 1)}
              className="w-24 text-center text-lg bg-cream-200 border-olive-green-100"
            />
          </div>

          <div className="mt-6 text-center text-sm text-navy-500">
            <p>
              You've read {completedBooksCount}{" "}
              {completedBooksCount === 1 ? "book" : "books"} so far.
            </p>

            {completedBooksCount > 0 && (
              <div className="mt-2 italic">
                {completedBooksCount >= readingGoal
                  ? "Congratulations! You've reached your goal! 🎉"
                  : `${
                      readingGoal - completedBooksCount
                    } more to reach your goal!`}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsGoalDialogOpen(false)}
            className="w-full sm:w-auto border-olive-green-400 text-navy-500 hover:bg-cream-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGoalUpdate}
            className="w-full sm:w-auto bg-olive-green-500 hover:bg-olive-green-400 text-white"
          >
            Update Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
