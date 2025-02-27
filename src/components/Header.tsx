import SignUpForm from "./SignUpForm";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-[300px] bg-cream-header py-2">
      <div className="container mx-auto px-4 flex items-center">
        <Image
          src="/assets/header.png"
          alt="header"
          width={210}
          height={270}
          objectFit="cover"
        />
        <Image
          src="/assets/header-txt.png"
          alt="header"
          width={360}
          height={410}
          objectFit="cover"
          className="mt-12 ml-12"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <SignUpForm />
        </div>
      </div>
    </header>
  );
}
