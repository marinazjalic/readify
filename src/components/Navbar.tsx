"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { genres } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { subjectMap } from "@/constants/constants";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

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

  const handleGenreClick = (subgenre: string) => {
    router.push(`/pages/books?filter=subject&query=${subgenre}`);
  };

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-navy-600">
            Readify
          </Link>
          <div className="flex-grow mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-navy-600 focus:ring-0 focus:outline-none"
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
            <Button
              onClick={() => signOut()}
              className="bg-navy-600 text-white hover:bg-navy-700"
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-navy-600 text-white hover:bg-navy-700"
            >
              Log In
            </Button>
          )}
        </div>
        <div className="flex justify-start items-center py-2">
          {Array.from(subjectMap.entries()).map(([key, value]) => (
            <DropdownMenu key={key}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-navy-600 hover:text-navy-800 hover:bg-white relative group px-4"
                >
                  {key}
                  <span className="absolute bottom-1 left-0 w-full h-0.5 bg-navy-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid grid-cols-2 gap-2 p-2">
                {value.map((subgenre, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="w-full"
                    onClick={() => handleGenreClick(subgenre)}
                  >
                    {subgenre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
    </nav>
  );
}
