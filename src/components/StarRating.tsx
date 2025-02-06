"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export default function StarRating({ editable = false, value = 0 }) {
  const [rating, setRating] = useState(value)
  const [hover, setHover] = useState(0)

  return (
    (<div className="flex space-x-2">
      {[...Array(5)].map((_, index) => {
        index += 1
        return (
          (<button
            type="button"
            key={index}
            className={`${
              index <= (editable ? hover || rating : value) ? "text-yellow-400" : "text-gray-300"
            } text-3xl focus:outline-none transition-colors duration-200 ease-in-out`}
            onClick={() => editable && setRating(index)}
            onMouseEnter={() => editable && setHover(index)}
            onMouseLeave={() => editable && setHover(rating)}>
            <Star
              fill={index <= (editable ? hover || rating : value) ? "currentColor" : "none"}
              size={28} />
          </button>)
        );
      })}
    </div>)
  );
}

