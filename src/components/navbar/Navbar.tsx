"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavDrawer from "./NavDrawer";
import UserMenu from "../user/UserMenu";
import NavDropDown from "./NavDropDown";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSearchSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      router.push(`/pages/books?filter=title&query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  if (pathname === "/pages/login" || pathname === "/pages/sign-up") {
    return null;
  }

  return (
    <>
      <nav className="bg-olive-green-500 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200 w-[100vw]">
        <div className="container mx-auto px-4 relative max-w-full">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <NavDrawer />
              <div className="w-24">
                <Link href="/">
                  <Image
                    src="/assets/logo.png"
                    alt="logo"
                    width={200}
                    height={100}
                  />
                </Link>
              </div>
            </div>
            <div className="flex-grow mx-8 lg:w-auto block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-100 bg-gray-100 focus:border-navy-600 focus:ring-0 focus:outline-none focus:border-gray-100"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  value={searchQuery}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            {session ? (
              <div>
                <UserMenu
                  userName={
                    session.user.firstName + " " + session.user.lastName
                  }
                  userEmail={session.user.email as string}
                  userProfileImg={session.user.image}
                />
              </div>
            ) : (
              <Button
                onClick={() => router.push("/pages/login")}
                className="bg-navy-600 text-white hover:bg-navy-700 text-xs w-15 mr-2"
              >
                Log In
              </Button>
            )}
          </div>
          <NavDropDown />
        </div>
      </nav>
      <div className="h-[calc(64px+50px)]"></div>
    </>
  );
}
