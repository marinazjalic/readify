"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  editable?: boolean;
}

export default function StarRating({
  value,
  editable = false,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.floor(value);
    const halfFilled = !filled && index < Math.ceil(value);
    return (
      <Star
        key={index}
        className={`w-6 h-6 ${
          filled
            ? "text-yellow-400 fill-current"
            : halfFilled
            ? "text-yellow-400 fill-yellow-400 half"
            : "text-gray-300"
        }`}
      />
    );
  });

  return <div className="flex">{stars}</div>;
}
