"use client";
import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-olive-green-100">
      <div className="m-auto bg-olive-green-500 p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <Link href="/" className="inline-block w-[150px] mt-4">
          <Image src="/assets/logo.png" alt="logo" width={200} height={100} />
        </Link>
        <SignUpForm
          bgColor="bg-olive-green-500"
          inputColor="bg-white"
          textStyle="text-white text-md"
          formWidth="w-81"
        />
      </div>
    </div>
  );
}
