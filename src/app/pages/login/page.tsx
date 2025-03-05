"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setValidationError(true);
    } else {
      router.push("/"); //temp go back to home page
    }
  };

  return (
    <div className="flex min-h-screen bg-olive-green-100">
      <div className="m-auto bg-olive-green-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" width={200} height={100} />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white [&:not(:placeholder-shown)]:text-gray-600 placeholder:text-gray-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white [&:not(:placeholder-shown)]:text-gray-600 placeholder:text-gray-500"
          />
          <div className="flex flex-col space-y-2">
            {validationError && (
              <p className="text-xs text-red-500 mb-1 text-center">
                Incorrect email or password.
              </p>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keepSignedIn"
                checked={keepSignedIn}
                className="border-white data-[state=checked]:bg-transparent data-[state=checked]:border-white"
                onCheckedChange={(checked) =>
                  setKeepSignedIn(checked as boolean)
                }
              />
              <label htmlFor="keepSignedIn" className="text-sm text-white">
                Keep me signed in
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-navy-600 hover:bg-navy-500"
          >
            Sign In
          </Button>
        </form>
        <div className="relative">
          <Separator className="my-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-olive-green-500 px-2 text-white text-xs">
              or
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mb-4 border-2 border-navy-600 text-navy-600"
        >
          Continue with Google
        </Button>
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-navy-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-white">Don't have an account? </span>
          <Link
            href="/pages/sign-up"
            className="text-sm text-navy-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
