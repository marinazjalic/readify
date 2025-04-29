import { Lora, Allura, Montserrat } from "next/font/google";
import Image from "next/image";
import { Button } from "../ui/button";
import TopBook from "./TopBook";
import { Separator } from "@/components/ui/separator";

const lora = Lora({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Newsletter() {
  return (
    <div className="hidden md:block w-[30%] h-120px bg-cream-100 border-r mt-4 mr-2 flex-col justify-center text-gray-600 ml-2 pr-4">
      <TopBook />
      <Separator />
      {/* reading challenge container */}
      <div className="w-[97%] mt-2 mr-2 flex mr-2">
        <div className="flex-shrink-0 w-16 sm:w-20 md:w-[5.5rem] flex items-center justify-center">
          <Image
            src="/assets/reading-challenge.png"
            alt="logo"
            width={120}
            height={120}
            className="object-contain w-full h-auto py-2"
          />
        </div>

        <div
          className={`${lora.className} flex-grow hidden sm:block mt-2 border-none`}
        >
          <h3 className="ml-2 text-lg sm:text-xl font-medium">
            2025 Reading Challenge
          </h3>
          <p className="text-xs  pl-2 pr-2 line-clamp-2 md:line-clamp-none mt-1">
            Set your reading goals and take part in exciting new challenges!
          </p>
        </div>
      </div>
      <Separator />

      {/* seasonal reading lists */}
      <div className="flex items-center justify-center">
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
      <Separator />

      <div className={`${lora.className} text-center mt-2 text-gray-500`}>
        <h4 className="text-lg text-gray-800">
          Join Our Community of Book Lovers!
        </h4>
        <p
          className={`${montserrat.className} text-xs ml-2 mr-2 text-gray-600 mt-1 mb-2`}
        >
          Sign up today to curate your virtual library, track your reading
          progress, and connect with others to see what they're reading!
        </p>
      </div>
      <Separator />

      <Image
        src="/assets/new-releases.png"
        alt="logo"
        width={500}
        height={50}
        className="mt-2 mb-2"
      />

      <Separator />
      <div
        className={`mt-4 px-4 text-center italic text-sm text-gray-500 ${lora.className}`}
      >
        <p>
          “Books are a uniquely portable magic.” <br />
          <span className="text-xs not-italic"> -Stephen King</span>
        </p>
      </div>
    </div>
  );
}
