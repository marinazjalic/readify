interface ReviewProgressBarProps {
  index: number;
  ratingPercent: number;
  reviewCount: number;
}

export default function ReviewProgressBar({
  index,
  ratingPercent,
  reviewCount,
}: ReviewProgressBarProps) {
  console.log("ratingPercent", ratingPercent);
  return (
    <div>
      <div className="flex items-center w-full">
        <p className="text-xs ml-2 text-gray-500 w-10">
          {index} star{index != 1 ? "s" : ""}
        </p>
        <div className="hover:bg-gray-200 w-[37%] h-7 flex items-center rounded-xl">
          <div className="bg-gray-300 w-[100%] h-2.5 rounded-md ml-2.5 mr-2.5">
            <div
              className="bg-teracota-600 h-full rounded-md"
              style={{ width: `${ratingPercent}%` }}
            ></div>
          </div>
        </div>
        <p className="text-gray-500 text-xs ml-2" id="rating-num">
          {reviewCount} review{reviewCount != 1 ? "s" : ""} (
          {ratingPercent.toFixed(0)}%)
        </p>
      </div>
    </div>
  );
}
