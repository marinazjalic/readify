import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { subjectMap } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { useState, type KeyboardEvent, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NavDropDown() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const handleGenreClick = (subgenre: string) => {
    router.push(`/pages/books?filter=subject&query=${subgenre}`);
  };

  return (
    <div className="flex justify-start items-center py-2 relative hidden lg:flex">
      {Array.from(subjectMap.entries()).map(([key, value]) => (
        <DropdownMenu
          key={key}
          open={openDropdown === key}
          onOpenChange={() => {}}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-navy-600 hover:text-navy-600 hover:bg-olive-green-500 relative group px-4 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
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
            className="grid grid-cols-2 gap-2 p-2 mt-0 rounded-t-none border-t-0 bg-olive-green-100"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              marginTop: "4px",
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
  );
}
