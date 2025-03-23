import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "../StarRating";
import { BookOpen, MessageCircle, Star } from "lucide-react";
import type { ActivityDetails } from "@/types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

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

  const getActivityDetails = () => {
    if (item.review) {
      return {
        icon: <Star className="w-4 h-4 text-white" />,
        bgColor: "bg-dusty-rose",
        textColor: "text-white",
      };
    } else if (item.discussion) {
      return {
        icon: <MessageCircle className="h-4 w-4 text-gray-500" />,
        bgColor: "bg-light-blue",
        textColor: "text-gray-500",
      };
    } else {
      return {
        icon: <BookOpen className="h-4 w-4 text-gray-500" />,
        bgColor: "bg-olive-green-100",
        textColor: "text-gray-500",
      };
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10 border-2 border-cream-200">
          <AvatarImage
            src={item.user.profileImageUrl || undefined}
            alt={`${item.user.firstName}'s avatar`}
          />
          <AvatarFallback>{item.user.firstName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center flex-wrap">
            <p className="text-sm text-gray-600">
              {item.user.firstName} {item.user.lastName}
            </p>
            {(() => {
              const activityDetails = getActivityDetails();
              return (
                <div
                  className={`flex items-center ml-2 px-2 py-0.5 ${activityDetails.bgColor} rounded-full`}
                >
                  {activityDetails.icon}
                  <p className={`text-xxs ${activityDetails.textColor} ml-1`}>
                    {item.activityDescription}
                  </p>
                </div>
              );
            })()}
            <span className="ml-auto text-xs text-gray-500">
              {formatRelativeTime(item.date)}
            </span>
          </div>

          {item.review?.content && (
            <div className="mt-3 p-3 0 rounded-md border-l-2 border-teracota-500">
              <div className="flex items-center mb-1">
                <StarRating value={item.review.rating} className="w-4 h-4" />
                <span className="text-xs text-teracota-500 ml-2">
                  {item.review.rating}/5 rating
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 ml-0.5">
                {item.review.content}
              </p>
            </div>
          )}

          {item.discussion && (
            <div className="mt-2 text-xs text-gray-500">
              <p className="leading-relaxed">{item.discussion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
