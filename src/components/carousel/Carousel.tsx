"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { settings } from "./slider-settings";
import { Book } from "@prisma/client";
import { Montserrat, Lora } from "next/font/google";
import { useBookStore } from "@/lib/bookStore";
import { BookDetails } from "@/types";

const montserrat = Montserrat({ subsets: ["latin"] });

interface CarouselProps {
  text: string;
  books: Book[];
}

export default function Carousel({ text, books }: CarouselProps) {
  const router = useRouter();
  const setCurrentBook = useBookStore((state) => state.setCurrentBook);

  const handleCoverClick = async (book: Book) => {
    if (book.bookKey) {
      const bookDetails: BookDetails = {
        title: book.title,
        author: book.author,
        cover: book.coverUrl || "",
        key: book.bookKey,
        publish_date: book.publish_date?.toISOString() || undefined,
      };
      setCurrentBook(bookDetails);
      router.push(`../pages/books/${book.bookKey}`);
    }
  };

  return (
    <div className="pl-2 pr-5 overflow-hidden">
      <h3 className={`text-lg ${montserrat.className} pl-2.5 pt-2`}>{text}</h3>
      <Slider {...settings}>
        {books.map((book: Book) => (
          <div key={book.id} className="image-container">
            <img
              src={
                book.coverUrl
                  ? `https://covers.openlibrary.org/b/id/${book.coverUrl}-L.jpg`
                  : `/assets/${book.id}.jpg`
              }
              alt={book.title}
              className="w-[95%] h-[200px] py-[5px] pl-[13px] focus:outline-none hover:scale-105 hover:overflow-hidden transition-transform duration-100"
              onClick={() => handleCoverClick(book)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
