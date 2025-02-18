"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, type KeyboardEvent, useRef } from "react";
import { genres } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { subjectMap } from "@/constants/constants";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, User, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      router.push(`/pages/books?filter=title&query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleGenreClick = (subgenre: string) => {
    router.push(`/pages/books?filter=subject&query=${subgenre}`);
  };

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-navy-600">
            Readify
          </Link>
          <div className="flex-grow mx-8">
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
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User avatar"}
                      />
                      <AvatarFallback>
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-0 rounded-t-none border-t-0"
                  style={{
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    marginTop: "2px",
                    marginRight: "4px",
                  }}
                >
                  <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User avatar"}
                      />
                      <AvatarFallback>
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem className="text-xs">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-navy-600 text-white hover:bg-navy-700"
            >
              Log In
            </Button>
          )}
        </div>

        <div className="flex justify-start items-center py-2 relative">
          {Array.from(subjectMap.entries()).map(([key, value]) => (
            <DropdownMenu
              key={key}
              open={openDropdown === key}
              onOpenChange={() => {}}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-navy-600 hover:text-navy-800 hover:bg-white relative group px-4"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {key}
                  <span className="absolute bottom-1 left-0 w-full h-0.5 bg-navy-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                className="grid grid-cols-2 gap-2 p-2 mt-0 rounded-t-none border-t-0"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  marginTop: "5px", //moves dropdown below navbar
                  transform: "translateX(-1px)",
                }}
              >
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
