import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NewsItem() {
  return (
    // temp layout
    <div className="bg-white p-4 rounded-lg shadow relative">
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={undefined} alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-start">
          <p className="text-xs font-medium pt-1">John Doe</p>
          <p className="text-xs pt-2">
            added "The Great Gatsby" to reading list
          </p>
        </div>
      </div>

      <span className="absolute top-0 right-0 text-xs text-gray-500 mt-3 mr-3">
        2h ago
      </span>
    </div>
  );
}
