import { Lora } from "next/font/google";
import Image from "next/image";
import { Award } from "lucide-react";
import StarRating from "../StarRating";

const lora = Lora({ subsets: ["latin"] });

export default function TopBook() {
  return (
    <div>
      <h3 className={`text-2xl ${lora.className} italics text-gray-600`}>
        Looking for your next read?
      </h3>

      <div className="mt-4 mb-2">
        <div className="flex items-center gap-2 border-l-4 border-teracota-500 pl-2">
          <Award className="h-5 w-5 text-teracota-500" />
          <h1 className="text-sm font-semibold">TOP BOOK THIS WEEK</h1>
        </div>
      </div>

      <div className="w-[97%] bg-cream-100 rounded-md p-3  mt-1 flex">
        <div className="h-36 w-24 flex-shrink-0 relative shadow-md rounded overflow-hidden">
          <Image
            src="/assets/66ddd80562024b171a6fb6cd.jpg"
            alt="Book cover"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-grow pl-4 flex flex-col justify-between">
          <div>
            <h4 className={`${lora.className} text-lg font-medium`}>
              The God of the Woods
            </h4>
            <p className="text-sm text-gray-600">Liz Moore</p>
            <div className="flex mt-2">
              <StarRating value={4} className="w-4 h-4" />
              {/* {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-amber-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))} */}
              <span className="text-xs ml-2 text-gray-500 pt-0.5">4.0</span>
            </div>
          </div>
          <p className="text-xs italic mt-2 text-gray-500 line-clamp-2">
            A captivating story that will keep you turning pages late into the
            night...
          </p>
        </div>
      </div>
    </div>
  );
}
