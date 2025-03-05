"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createUser } from "@/actions/users/createUser";

interface SignUpFormProps {
  bgColor?: string;
  inputColor?: string;
  border?: string;
  shadow?: string;
  textColor?: string;
  textSize?: string;
  textStyle?: string;
  formWidth?: string;
  buttonColor?: string;
}

export default function SignUpForm({
  bgColor = "bg-white",
  inputColor = "bg-transparent",
  border = "border-none",
  shadow = "shadow-none",
  textStyle = "text-lg text-gray-800 font-bold",
  formWidth = "w-72",
  buttonColor = "bg-navy-600 hover:bg-navy-500",
}: SignUpFormProps) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const { confirmPassword, ...userData } = formData;
    await createUser(userData);
  };

  const handleGoogleSignUp = () => {};

  return (
    <div
      className={`${formWidth} ${bgColor} p-3 rounded-lg ${shadow} ${border}`}
    >
      <h2 className={`${textStyle} text-center mb-2`}>Join the Community</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex space-x-2">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`flex-1 h-8 text-sm ${inputColor}`}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`flex-1 h-8 text-sm ${inputColor}`}
          />
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`h-8 text-sm ${inputColor}`}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={`h-8 text-sm ${inputColor}`}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={`h-8 text-sm ${inputColor}`}
        />
        <Button type="submit" className={`w-full h-8 text-sm ${buttonColor}`}>
          Sign Up
        </Button>
        <div className="relative">
          <Separator className="my-2" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${bgColor} px-2 text-gray-500 text-xs`}>or</span>
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
