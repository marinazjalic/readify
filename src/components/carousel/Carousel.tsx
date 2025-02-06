"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { settings } from "./slider-settings";
export interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction?: string;
}

interface CarouselProps {
  text: string;
  map: Map<string, string[]>;
}

export default function Carousel({ text, map }: CarouselProps) {
  const router = useRouter();
  const [bookObj, setBookObj] = useState<Record<string, any>>({});

  const books =
    Array.from(map.entries()).filter((entry) => entry[0] === text)[0]?.[1] ??
    [];

  const handleCoverClick = async (bookId: string) => {
    router.push("/book");
  };

  return (
    <div className="carousel-container">
      <h3 className="heading-text">{text}</h3>
      <Slider {...settings}>
        {books.map((id: string) => (
          <div key={id} className="image-container">
            <img
              src={`/assets/${id}.jpg`}
              alt={id}
              className="slider-image"
              onClick={() => handleCoverClick(id)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
