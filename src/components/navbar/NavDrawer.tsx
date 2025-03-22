"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { subjectMap } from "@/constants/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function NavDrawer() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreClick = (subgenre: string) => {
    router.push(`/pages/books?filter=subject&query=${subgenre}`);
    setIsOpen(false);
    setSelectedGenre(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedGenre(null);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 lg-xl:hidden hover:bg-olive-green-500 text-cream-header hover:text-gray-200"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] p-0 bg-cream-header text-navy-500"
        >
          {selectedGenre && (
            <Button
              variant="ghost"
              className="flex items-center justify-start mt-2 text-navy-600 hover:bg-cream-header hover:text-gray-500"
              onClick={() => setSelectedGenre(null)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
            </Button>
          )}

          <VisuallyHidden>
            <SheetHeader className="px-4 py-4 border-b">
              <SheetTitle className="text-navy-600">Categories</SheetTitle>
            </SheetHeader>
          </VisuallyHidden>

          <div
            className={
              selectedGenre
                ? "overflow-y-auto h-full"
                : "overflow-y-auto h-full pt-9"
            }
          >
            {(() => {
              if (selectedGenre) {
                const subgenres = subjectMap.get(selectedGenre) || [];
                return (
                  <div>
                    <div className="px-5 py-2 font-semibold text-lg">
                      {selectedGenre}
                    </div>
                    <nav className="flex flex-col">
                      {/* rendering all related subgenre buttons */}
                      {subgenres.map((subgenre, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="justify-start px-6 py-3 text-left rounded-none hover:bg-cream-header hover:text-gray-500"
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
                      className="flex items-center justify-between px-4 py-3 text-left rounded-none hover:bg-cream-header hover:text-gray-500"
                      onClick={() => setSelectedGenre(genre)}
                    >
                      <span>{genre}</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </Button>
                  ))}
                </nav>
              );
            })()}
          </div>
        </SheetContent>
      </Sheet>

      {/* remove the outline from the close button */}
      <style jsx global>{`
        .sheet-close-button {
          outline: none !important;
          box-shadow: none !important;
        }

        [data-radix-collection-item] {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
