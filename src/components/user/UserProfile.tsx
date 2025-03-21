"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { ReadingStatus } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserProfile() {
  const {
    firstName,
    lastName,
    email,
    profileImageUrl,
    followerIds,
    followingIds,
    savedBooks,
    isLoadingBooks,
  } = useUserContext();

  const [readingGoal, setReadingGoal] = useState(0);
  const [newGoal, setNewGoal] = useState(readingGoal);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  const completedBooksCount =
    savedBooks?.filter(
      (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
    ).length || 0;

  const progressPercentage = Math.min(
    100,
    (completedBooksCount / readingGoal) * 100
  );

  const currentYear = new Date().getFullYear();

  const handleGoalUpdate = () => {
    setReadingGoal(newGoal);
    setIsGoalDialogOpen(false);

    //to-do update in db
  };

  return (
    <aside className="w-full md:w-[27%] md:fixed md:h-[77vh] p-4 bg-white mt-7 ml-5 border ml-2">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 mb-4">
          <AvatarImage src={profileImageUrl} alt="User avatar" />
          <AvatarFallback>
            {firstName && lastName
              ? `${firstName[0]}${lastName[0]}`
              : email
              ? email[0].toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-medium">
          {firstName} {lastName}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{email}</p>

        <div className="flex gap-4">
          <Link
            href="/followers"
            className="text-blue-500 hover:underline text-xs"
          >
            {followerIds?.length} follower{" "}
            {followerIds?.length === 1 ? "" : "s"}
          </Link>
          <Link
            href="/following"
            className="text-blue-500 hover:underline text-xs"
          >
            {followingIds?.length} following
          </Link>
        </div>
      </div>

      <Separator className="mx-auto w-[90%] md:w-[80%]" />

      <div className="py-4">
        <h3 className="text-sm text-navy-600 mb-2 px-4">
          VIEW VIRTUAL LIBRARY
        </h3>

        <div className="flex items-start px-2">
          <Image
            src="/assets/saved-book-icon.png"
            alt="Book icon"
            width={60}
            height={60}
            className="flex-shrink-0"
          />
          <div className="flex flex-col text-xs text-gray-500 ml-2 mt-0.5 space-y-1">
            <Link href="/" className="hover:underline">
              {savedBooks?.filter(
                (book) => book.savedInfo?.status === ReadingStatus.TO_READ
              ).length || 0}{" "}
              Want to Read
            </Link>
            <Link href="/" className="hover:underline">
              {savedBooks?.filter(
                (book) => book.savedInfo?.status === ReadingStatus.IN_PROGRESS
              ).length || 0}{" "}
              Currently Reading
            </Link>
            <Link href="/" className="hover:underline">
              {savedBooks?.filter(
                (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
              ).length || 0}{" "}
              Read
            </Link>
          </div>
        </div>
      </div>

      <Separator className="mx-auto w-[90%] md:w-[80%]" />

      <div className="py-4">
        <h3 className="text-sm text-navy-600 px-4">READING CHALLENGE</h3>
        <div className="w-[85%] ml-4">
          <div className="bg-gray-300 w-full h-2.5 rounded-md mt-2">
            <div
              className="bg-olive-green-500 h-full rounded-md transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex flex-row text-xxs text-gray-500 mt-1">
            <p>
              {completedBooksCount}/{readingGoal} books read
            </p>
            <button
              className="ml-auto hover:text-blue-500 transition-colors"
              onClick={() => setIsGoalDialogOpen(true)}
            >
              Update goal
            </button>
          </div>
        </div>
      </div>

      {/* Reading Goal Dialog */}
      <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-navy-500 text-center text-xl font-semibold">
              Reading Challenge {currentYear}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <Label
              htmlFor="goal"
              className="text-dusty-rose text-center block mb-2"
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
                onChange={(e) =>
                  setNewGoal(Number.parseInt(e.target.value) || 1)
                }
                className="w-24 text-center text-lg"
              />
            </div>

            <div className="text-xs mt-4 text-center text-sm text-muted-foreground">
              You've read {completedBooksCount}{" "}
              {completedBooksCount === 1 ? "book" : "books"} so far.
              {completedBooksCount > 0 && (
                <div className="mt-2">
                  {completedBooksCount >= readingGoal
                    ? "Congratulations! You've reached your goal! 🎉"
                    : `${
                        readingGoal - completedBooksCount
                      } more to reach your goal!`}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGoalDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGoalUpdate}
              className="w-full sm:w-auto bg-olive-green-500 hover:bg-olive-green-600"
            >
              Update Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
