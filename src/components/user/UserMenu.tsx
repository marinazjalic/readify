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
        className="rounded-full hover:bg-olive-green-500 text-cream-header hover:text-gray-300 mr-4 transition-all duration-200 relative group"
        onClick={handleBookIconClick}
      >
        <BookOpen className="h-5 w-5" />
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Library
        </span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-olive-green-500 text-cream-header hover:text-gray-300 mr-4 transition-all duration-200 relative group"
        onClick={handleNewsIconClick}
      >
        <RssIcon className="h-5 w-5" />
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
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
          <DropdownMenuItem className="text-xs">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
