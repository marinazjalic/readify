import SignUpForm from "./SignUpForm";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-[300px] bg-light-blue py-2">
      <div className="container mx-auto px-4 flex items-center">
        <Image
          src="/assets/header-img-person.png"
          alt="header"
          width={230}
          height={290}
          objectFit="cover"
          className="mt-2"
        />
        <Image
          src="/assets/header-img-text.png"
          alt="header"
          width={480}
          height={450}
          objectFit="cover"
          className="mt-12 ml-12"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <SignUpForm
            shadow="shadow-lg"
            border="border-2"
            buttonColor="bg-teracota-600 hover:bg-teracota-500"
          />
        </div>
      </div>
    </header>
  );
}
