import { Lora } from "next/font/google";
import Image from "next/image";

const lora = Lora({ subsets: ["latin"] });
export default function Newsletter() {
  return (
    <div className="w-[30%] h-120px bg-white border-r mt-4 mr-2 flex-col justify-center text-gray-600 ml-2">
      <h3 className={`text-2xl ${lora.className} italics`}>
        Looking for your next read?
      </h3>
      <h1 className="text-sm mt-2 ">Top Book This Week</h1>
      {/* temp container for top book */}
      <div className="bg-olive-green-100 w-[97%] h-40 mt-2"></div>

      <div className="mr-2">
        <h3 className={`${lora.className} text-lg mt-2`}>
          See what your friends are reading!
        </h3>
        <p className="text-xs">
          Connect with others, share your thoughts, and host your next book
          club.
        </p>
      </div>

      {/* reading challenge container */}
      <div className="border-t-2 border-b-2 border-olive-green-100 w-[97%] mt-2 mr-2 flex">
        <div className="flex-shrink-0 w-16 sm:w-20 md:w-[5.5rem] flex items-center justify-center">
          <Image
            src="/assets/reading-challenge.png"
            alt="logo"
            width={120}
            height={120}
            className="object-contain w-full h-auto py-2"
          />
        </div>

        <div className={`${lora.className} flex-grow hidden sm:block mt-2`}>
          <h3 className="ml-2 text-lg sm:text-xl font-medium">
            2025 Reading Challenge
          </h3>
          <p className="text-xs  pl-2 pr-2 line-clamp-2 md:line-clamp-none mt-1">
            Set your reading goals and take part in exciting new challenges!
          </p>
        </div>
      </div>
    </div>
  );
}
