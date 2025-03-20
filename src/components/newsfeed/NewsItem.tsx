import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, User, SavedBook, Review } from "@prisma/client";
import StarRating from "../StarRating";
import { Star } from "lucide-react";
import { ActivityDetails } from "@/types";

interface NewsItemProps {
  item: ActivityDetails;
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
    <div className="bg-white p-4 shadow relative">
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={undefined} alt="User avatar" />
          <AvatarFallback>{item.user.firstName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex flex-row text-xs">
            <p className="pt-1">
              {item.user.firstName} {item.user.lastName}
            </p>
            <p className="text-gray-500 italic pt-1 pl-1">
              {item.activityDescription}
            </p>
          </div>
          {item.review?.content && (
            <div className="text-xs mt-2 text-gray-700">
              <StarRating value={item.review.rating} className="w-3.5 h-3.5" />
              <p className="mt-0.5 ml-0.5">{item.review.content}</p>
            </div>
          )}
        </div>
      </div>

      <span className="absolute top-0 right-0 text-xs text-gray-500 mt-3 mr-3">
        {formatRelativeTime(item.date)}
      </span>
    </div>
  );
}
