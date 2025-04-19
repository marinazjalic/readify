import { Settings } from "react-slick";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction?: string;
}

function SampleNextArrow({ style, onClick, direction }: ArrowProps) {
  return (
    <div
      className="absolute flex flex-col h-[10px] w-[10px] top-1/2 left-full transform -translate-y-1/2 cursor-pointer"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "20px",
        height: "20px",
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

function SamplePrevArrow({ style, onClick }: ArrowProps) {
  return (
    <div
      className="absolute flex flex-col h-[10px] w-[10px] top-1/2 -translate-x-1/2"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "20px",
        height: "20px",
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left" style={{ color: "black" }} />
    </div>
  );
}

export const settings: Settings = {
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
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
