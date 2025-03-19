import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity } from "@prisma/client";

interface NewsItemProps {
  item: Activity & {
    activityDescription?: string;
  };
}
export default function NewsItem({ item }: NewsItemProps) {
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

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
          <p className="text-xs pt-2">{item.activityDescription}</p>
        </div>
      </div>

      <span className="absolute top-0 right-0 text-xs text-gray-500 mt-3 mr-3">
        {formatRelativeTime(item.date)}
      </span>
    </div>
  );
}
