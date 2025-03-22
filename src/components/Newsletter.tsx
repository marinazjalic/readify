import { Lora, Allura } from "next/font/google";
import Image from "next/image";
import { Button } from "./ui/button";

const lora = Lora({ subsets: ["latin"] });
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

export default function Newsletter() {
  return (
    <div className="hidden md:block w-[30%] h-120px bg-cream-100 border-r mt-4 mr-2 flex-col justify-center text-gray-600 ml-2">
      <h3 className={`text-2xl ${lora.className} italics`}>
        Looking for your next read?
      </h3>
      <h1 className="text-sm mt-2 ">Top Book This Week</h1>

      {/* temp placeholder for top book */}
      <div className="w-[97%] h-40 mt-2 flex">
        <div className="h-full w-28 flex-shrink-0 relative">
          <Image
            src="/assets/66ddd80562024b171a6fb6cd.jpg"
            alt="Book cover"
            fill
            className="object-contain object-left"
          />
        </div>

        <div className="flex-grow pl-2 flex flex-col">
          <h4 className="text-md font-medium">Book Title</h4>
          <p className="text-sm text-gray-600">Author Name</p>
        </div>
      </div>

      <div className="mr-2 border-t-2 mt-2">
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

      {/* seasonal reading lists */}
      <div className="flex items-center justify-center border-b-2">
        <Image
          src="/assets/spring-icon.png"
          alt="logo"
          width={23}
          height={23}
          className="mt-1 mr-2 mb-2"
        />
        <Button className="bg-cream-100 hover:bg-cream-100 text-gray-500 text-xs border-none shadow-none px-0 hover:underline">
          Discover New Releases This Spring
        </Button>
        <Image
          src="/assets/spring-icon.png"
          alt="logo"
          width={23}
          height={23}
          className="mt-1 ml-2 mb-2"
        />
      </div>

      <div className="mt-2 flex border-b-2 border-olive-green-100">
        <div className="w-[35%]">
          <h3 className={`text-5xl ${allura.className} mb-1`}>Sign In</h3>
        </div>
        <p className={`${lora.className} text-xxs w-[55%] ml-4 mt-1`}>
          Start curating your virtual library and unlock personalized
          recommendations.
        </p>
      </div>
    </div>
  );
}
