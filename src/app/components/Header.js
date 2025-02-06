import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function Header() {
  return (
    <header className="bg-gray-100 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* <Link href="/" className="text-2xl font-bold text-gray-800">
          Your Logo
        </Link> */}
        <p>Discover, Read, and Share books you love.</p>
        <SignUpForm />
      </div>
    </header>
  );
}
