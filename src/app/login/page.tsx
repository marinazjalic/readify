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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.error(result.error);
    } else {
      router.push("/"); //temp go back to home page
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <h3 className="text-2xl font-bold text-navy-600">Readify</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keepSignedIn"
              checked={keepSignedIn}
              onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
            />
            <label htmlFor="keepSignedIn" className="text-sm text-gray-600">
              Keep me signed in
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-navy-600 hover:bg-navy-700"
          >
            Sign In
          </Button>
        </form>
        <Separator className="my-4" />
        <Button variant="outline" className="w-full mb-4">
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
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-sm text-navy-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
