"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { BookOpen, BookMarked } from "lucide-react";
import { Montserrat, Lora } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

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
    <aside className="w-full md:w-[27%] bg-white md:fixed md:h-[90vh] mt-5 border border-olive-green-100  overflow-auto">
      {/* Profile Header */}
      <div className="pt-6 pb-4 px-4 border-b border-olive-green-100">
        <div className="flex flex-col items-center">
          <Avatar className="h-40 w-40 md:h-36 w-36 lg:h-40 lg:w-40 shadow-sm mb-4">
            <AvatarImage src={profileImageUrl} alt="User avatar" />
            <AvatarFallback className="bg-olive-green-400 text-white text-3xl">
              {firstName && lastName
                ? `${firstName[0]}${lastName[0]}`
                : email
                ? email[0].toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>

          <h3 className={`${montserrat.className} text-lg text-navy-600`}>
            {firstName} {lastName}
          </h3>
          <p className={`${montserrat.className} text-xs text-gray-400 mb-3`}>
            {email}
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/followers"
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">{followerIds?.length || 0}</span>
              <span className="text-xs">
                Follower{followerIds?.length === 1 ? "" : "s"}
              </span>
            </Link>
            <Link
              href="/following"
              className="text-navy-500 hover:text-teracota-500 transition-colors flex flex-col items-center"
            >
              <span className="font-medium">{followingIds?.length || 0}</span>
              <span className="text-xs">Following</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Virtual Library */}
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

      {/* Reading Challenge */}
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
            {/* <BookMarked className="w-5 h-5 text-teracota-500 mr-2" /> */}
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

          {completedBooksCount >= readingGoal && readingGoal > 0 && (
            <div className="mt-3 text-xs text-center p-2 bg-light-blue rounded-md text-navy-500 italic border border-olive-green-100">
              Congratulations! You've reached your reading goal for{" "}
              {currentYear}! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Reading Goal Dialog */}
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
                onChange={(e) =>
                  setNewGoal(Number.parseInt(e.target.value) || 1)
                }
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
    </aside>
  );
}
