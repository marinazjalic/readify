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
    <div className="pl-2 pr-5 overflow-hidden">
      <h3 className="text-[22px] font-thin pl-[5px]">{text}</h3>
      <Slider {...settings}>
        {books.map((book: Book) => (
          <div key={book.id} className="image-container">
            <img
              src={`/assets/${book.id}.jpg`}
              alt={book.title}
              className="w-[95%] h-[200px] py-[5px] pl-[13px] focus:outline-none hover:scale-105 hover:overflow-hidden transition-transform duration-100"
              onClick={() => handleCoverClick(book.id)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
