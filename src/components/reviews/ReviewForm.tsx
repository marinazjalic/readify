"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/StarRating";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { createReview } from "@/actions/reviews/createReview";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { createActivity } from "@/actions/activity/createActivity";
import { ActivityType } from "@prisma/client";

interface ReviewsProps {
  bookId: string;
  bookTitle: string;
  bookCover: string;
}

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ReviewForm({
  bookId,
  bookTitle,
  bookCover,
}: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewSubject, setReviewSubject] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (newRating === 0) {
      setErrorMessage("Please leave rating.");
    } else setErrorMessage("");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      if (rating != 0) {
        setIsDialogOpen(false);
        const review = await createReview(
          bookId,
          session.user.id,
          rating,
          reviewContent,
          reviewSubject
        );

        //creating news feed activity
        if (review.success) {
          await createActivity(
            session.user.id,
            ActivityType.REVIEWED,
            bookId,
            bookTitle,
            undefined,
            review.data?.id
          );
        }
        resetFormValues();
      } else {
        setErrorMessage("Please leave rating.");
      }
    }
  };

  const handleLeaveReviewBtn = () => {
    if (session) {
      setIsDialogOpen(true);
    } else {
      router.push("/pages/login");
    }
  };

  const resetFormValues = () => {
    setRating(0);
    setReviewSubject("");
    setReviewContent("");
    setErrorMessage("");
  };

  return (
    <div className="mt-8">
      <Separator className="my-4" />
      <h3
        className={`text-xl font-semibold mb-6 text-center text-navy-600 ${montserrat.className} italic`}
      >
        Let other readers know what you thought.
      </h3>
      <div className="flex justify-center">
        <Button
          className={`${montserrat.className} bg-navy-600 text-white text-xs hover:bg-navy-500 hover:text-white rounded-full`}
          onClick={handleLeaveReviewBtn}
        >
          Leave Review
        </Button>
        {session && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle
                  className={`${montserrat.className} text-navy-600 italic `}
                >
                  Share your thoughts
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={`https://covers.openlibrary.org/b/id/${bookCover}-L.jpg`}
                    alt={bookTitle}
                    width={60}
                    height={90}
                    className="object-cover shadow-lg rounded-tr-lg rounded-br-lg"
                  />
                  <h4 className={`${montserrat.className} font-semibold`}>
                    {bookTitle}
                  </h4>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <StarRating
                    value={rating}
                    className="w-5 h-5"
                    onChange={handleRatingChange}
                    editable
                  />
                  <span
                    className={`${montserrat.className} text-xs text-gray-500`}
                  >
                    {errorMessage == "" ? "Rate this book" : errorMessage}
                  </span>
                </div>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="border-2 rounded-md">
                    <Input
                      placeholder="Subject: "
                      value={reviewSubject}
                      className="border-b border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus-visible:ring-transparent placeholder:text-xs text-xxs text-gray-600"
                      onChange={(e) => setReviewSubject(e.target.value)}
                    />
                    <Textarea
                      placeholder="Share your thoughts"
                      value={reviewContent}
                      className="border-none shadow-none focus-visible:ring-transparent placeholder:text-xs"
                      onChange={(e) => setReviewContent(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-olive-green-500 text-navy-600"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetFormValues();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-olive-green-500 hover:bg-olive-green-400"
                    >
                      Submit Review
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Separator className="my-4" />
    </div>
  );
}
