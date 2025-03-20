"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  className: string;
  onChange?: (rating: number) => void;
  editable?: boolean;
}

export default function StarRating({
  value,
  className,
  onChange,
  editable = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating: number) => {
    if (editable && onChange) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating: number) => {
    if (editable) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${className} ${
            star <= (hoverRating || value) ? "text-yellow-400" : "text-gray-300"
          } ${editable ? "cursor-pointer" : ""}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
