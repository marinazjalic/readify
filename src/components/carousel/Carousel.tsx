"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { settings } from "./slider-settings";
import { Book } from "@prisma/client";

interface CarouselProps {
  text: string;
  books: Book[];
}

export default function Carousel({ text, books }: CarouselProps) {
  const router = useRouter();

  const handleCoverClick = async (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  return (
    <div className="carousel-container">
      <h3 className="heading-text">{text}</h3>
      <Slider {...settings}>
        {books.map((book: Book) => (
          <div key={book.id} className="image-container">
            <img
              src={`/assets/${book.id}.jpg`}
              alt={book.title}
              className="slider-image"
              onClick={() => handleCoverClick(book.id)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
