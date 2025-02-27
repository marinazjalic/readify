"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  LogOut,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { subjectMap } from "@/constants/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavDrawer() {
  const router = useRouter();

  const handleGenreClick = (subgenre: string) => {
    router.push(`/pages/books?filter=subject&query=${subgenre}`);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle>Genres & Categories</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full">
            {(() => {
              //tracking if a genre is selected & getting its subgenres by key/value pair
              const [selectedGenre, setSelectedGenre] = useState<string | null>(
                null
              );
              if (selectedGenre) {
                const subgenres = subjectMap.get(selectedGenre) || [];
                return (
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start p-4 mb-2"
                      onClick={() => setSelectedGenre(null)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Categories
                    </Button>
                    <div className="px-4 py-2 font-semibold text-lg">
                      {selectedGenre}
                    </div>
                    <nav className="flex flex-col">
                      {/* rendering all related subgenre buttons */}
                      {subgenres.map((subgenre, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="justify-start px-6 py-3 text-left rounded-none hover:bg-gray-100"
                          onClick={() => {
                            handleGenreClick(subgenre);
                          }}
                        >
                          {subgenre}
                        </Button>
                      ))}
                    </nav>
                  </div>
                );
              }
              return (
                <nav className="flex flex-col">
                  {Array.from(subjectMap.keys()).map((genre) => (
                    <Button
                      key={genre}
                      variant="ghost"
                      className="flex items-center justify-between px-4 py-3 text-left rounded-none hover:bg-gray-100"
                      onClick={() => setSelectedGenre(genre)}
                    >
                      <span>{genre}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ))}
                </nav>
              );
            })()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
