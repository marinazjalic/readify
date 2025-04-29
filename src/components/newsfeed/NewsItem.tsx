import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "../StarRating";
import { BookOpen, MessageCircle, Star } from "lucide-react";
import type { ActivityDetails } from "@/types";
import { Montserrat } from "next/font/google";
import { useState, useEffect } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

interface NewsItemProps {
  item: ActivityDetails;
}

export default function NewsItem({ item }: NewsItemProps) {
  const [defaultColour, setDefaultColour] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (item.user?.profileImageColour) {
      setDefaultColour(item.user.profileImageColour);
    }
  }, [item.user.profileImageColour]);

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
        icon: <Star className="w-3.5 h-3.5 text-gray-400" />,
        borderColor: "border-amber-500",
        margins: "mt-0.5 ml-1",
      };
    } else if (item.discussion) {
      return {
        icon: <MessageCircle className="h-3.5 w-3.5 text-gray-400" />,
        borderColor: "border-sky-300",
        margins: "mt-0.5 ml-0.5",
      };
    } else {
      return {
        icon: <BookOpen className="h-3.5 w-3.5 text-gray-400" />,
        borderColor: "border-olive-green-500",
        margins: "mt-0 ml-1",
      };
    }
  };

  return (
    <div className="py-4 px-4 sm:px-4 md:px-0">
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10 border-2 border-cream-200">
          <AvatarImage
            src={item.user.profileImageUrl || undefined}
            alt={`${item.user.firstName}'s avatar`}
            className="object-cover"
          />
          <AvatarFallback
            className={
              defaultColour
                ? `bg-${defaultColour} text-white`
                : `bg-gray-400 text-white`
            }
          >
            {item.user.firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center flex-wrap">
            <p className="text-xs font-semibold text-gray-600">
              {item.user.firstName} {item.user.lastName}
            </p>
            {(() => {
              const activityDetails = getActivityDetails();
              return (
                <div
                  className={`flex items-center h-6 pl-1.5 ${activityDetails.borderColor}`}
                >
                  <div className="flex items-center justify-center">
                    {activityDetails.icon}
                  </div>
                  <p
                    className={`text-xxs text-gray-400 ${activityDetails.margins}`}
                  >
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
            <div className="mt-3 p-3 0 rounded-md border-l-2 border-aqua">
              <div className="flex items-center mb-1">
                <StarRating value={item.review.rating} className="w-4 h-4" />
                <span className="text-xs text-gray-400 ml-1.5 pt-0.5">
                  {item.review.rating}/5
                </span>
              </div>
              <p className="text-xxs text-gray-500 mt-1.5 ml-0.5">
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
