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

interface ReviewsProps {
  bookId: string;
  bookTitle: string;
  bookCover: string;
}

export default function ReviewForm({
  bookId,
  bookTitle,
  bookCover,
}: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewSubject, setReviewSubject] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const review = await createReview(
        bookId,
        session.user.id,
        rating,
        reviewContent,
        reviewSubject
      );
    }

    setIsDialogOpen(false);
  };

  const handleLeaveReviewBtn = () => {
    if (session) {
      setIsDialogOpen(true);
    } else {
      router.push("/pages/login");
    }
  };

  return (
    <div className="mt-8">
      <Separator className="my-4" />
      <h3 className="text-xl font-semibold mb-6 text-center">
        Let other readers know what you thought.
      </h3>
      <div className="flex justify-center">
        <Button onClick={handleLeaveReviewBtn}>Leave Review</Button>
        {session && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={`https://covers.openlibrary.org/b/id/${bookCover}-L.jpg`}
                    alt={bookTitle}
                    width={60}
                    height={90}
                    className="object-cover"
                  />
                  <h4 className="font-semibold">{bookTitle}</h4>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <StarRating
                    value={rating}
                    onChange={handleRatingChange}
                    editable
                  />
                  <span className="text-xs text-gray-500">Rate this book</span>
                </div>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <Input
                    placeholder="Review Subject"
                    value={reviewSubject}
                    onChange={(e) => setReviewSubject(e.target.value)}
                  />
                  <Textarea
                    placeholder="Your review"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Review</Button>
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
