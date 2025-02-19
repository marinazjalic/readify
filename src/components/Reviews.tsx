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

interface ReviewsProps {
  bookId: string;
  bookTitle: string;
  bookCover: string;
}

export default function Reviews({
  bookId,
  bookTitle,
  bookCover,
}: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({ subject: "", content: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  //to do
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
  };

  return (
    <div className="mt-8">
      <Separator className="my-4" />
      <h3 className="text-xl font-semibold mb-6 text-center">
        Let other readers know what you thought.
      </h3>
      <div className="flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Leave Review</Button>
          </DialogTrigger>
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
                  value={review.subject}
                  onChange={(e) =>
                    setReview({ ...review, subject: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Your review"
                  value={review.content}
                  onChange={(e) =>
                    setReview({ ...review, content: e.target.value })
                  }
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
      </div>
      <Separator className="my-4" />
    </div>
  );
}
