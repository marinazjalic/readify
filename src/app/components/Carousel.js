import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SampleNextArrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <div
      className="custom-slider-arrow"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "20px",
        height: "20px",
        background: "white",
      }}
      onClick={onClick}
    >
      {direction === "next" ? (
        <i className="fa fa-chevron-right" id="arrow-right" />
      ) : (
        <i className="fa fa-chevron-left" style={{ color: "black" }} />
      )}
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <div
      className="custom-slider-arrow-left"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "20px",
        height: "20px",
        background: "white",
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left" style={{ color: "black" }} />
    </div>
  );
}

export default function Carousel({ text, map }) {
  const entries = Array.from(map.entries());
  const books = entries.filter((entry) => entry[0] == text)[0][1]; //filtering the map array
  const [bookObj, setBookObj] = useState({});

  const router = useRouter();

  const handleCoverClick = (bookId) => {
    // fetchBookDetails(bookId);
    // router.push(`/book/${bookId}`);

    //temp map to book display
    router.push("/book");
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      if (!response.ok) {
        throw new Error("Error: Failed to fetch book details. ");
      }
      const data = await response.json();
    } catch (error) {
      throw new Error("Error: Failed to fetch book details. ");
    }
  };

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SampleNextArrow direction="next" />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h3 className="heading-text">{text}</h3>
      <Slider {...settings}>
        {books.map((id) => (
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
