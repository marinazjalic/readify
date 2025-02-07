"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle form submission logic here
    console.log("Form submitted", formData);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic here
    console.log("Google sign-up clicked");
  };

  return (
    <div className="w-72 bg-white p-3 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-center text-gray-800 mb-2">
        Join the Community
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex space-x-2">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="flex-1 h-8 text-sm"
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="flex-1 h-8 text-sm"
          />
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-8 text-sm"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="h-8 text-sm"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="h-8 text-sm"
        />
        <Button type="submit" className="w-full h-8 text-sm">
          Sign Up
        </Button>
        <div className="relative">
          <Separator className="my-2" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-gray-500 text-xs">or</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full h-8 text-sm"
          onClick={handleGoogleSignUp}
        >
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
