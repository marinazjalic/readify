import SignUpForm from "./SignUpForm";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-[300px] bg-cream-header py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Image
          src="/assets/header.png"
          alt="header"
          width={220}
          height={280}
          objectFit="cover"
          className="absolute top-0 left-0"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <SignUpForm />
        </div>
      </div>
    </header>
  );
}
