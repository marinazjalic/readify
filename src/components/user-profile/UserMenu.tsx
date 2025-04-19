"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Newspaper, BookOpen, RssIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  userName: string;
  userEmail: string;
  userProfileImg?: string | null;
}

export default function UserMenu({
  userName,
  userEmail,
  userProfileImg,
}: UserMenuProps) {
  const router = useRouter();

  const handleBookIconClick = () => {
    router.push("/pages/books/savedBooks");
  };

  const handleNewsIconClick = () => {
    router.push("/pages/user-home");
  };

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-olive-green-500 text-cream-100 hover:text-gray-300 mr-4 transition-all duration-200 relative group"
        onClick={handleBookIconClick}
      >
        <BookOpen className="h-5 w-5" />
        <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-gray-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Library
        </span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-olive-green-500 text-cream-100 hover:text-gray-300 mr-4 transition-all duration-200 relative group"
        onClick={handleNewsIconClick}
      >
        <RssIcon className="h-5 w-5" />
        <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-gray-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Newsfeed
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full mr-3">
            <Avatar>
              <AvatarImage
                src={userEmail || undefined}
                alt={userName || "User avatar"}
              />
              <AvatarFallback>{userName[0] || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 p-0 rounded-lg border-t-0 bg-cream-100"
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
                src={userProfileImg || undefined}
                alt={userName || "User avatar"}
              />
              <AvatarFallback>{userName[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
          <DropdownMenuItem className="text-xs text-gray-600">
            <User className="mr-1 h-4 w-4 scale-[0.9] " />
            <p className="mt-1">Profile</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs text-gray-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-1 h-4 w-4 scale-[0.9]" />
            <p className="mt-1">Sign out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
