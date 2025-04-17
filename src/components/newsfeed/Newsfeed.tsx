"use client";

import { getActivitiesForFeed } from "@/actions/activity/getActivities";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import type { ActivityDetails } from "@/types";
import DiscussionBox from "./DiscussionBox";
import type { Activity } from "@prisma/client";
import { BookOpen, Loader2 } from "lucide-react";
import { Lora } from "next/font/google";
import { Separator } from "@/components/ui/separator";

const lora = Lora({ subsets: ["latin"] });

export default function Newsfeed() {
  const { data: session } = useSession();
  const [newsfeed, setNewsfeed] = useState<ActivityDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNewsFeed = async () => {
    const activities = await getActivitiesForFeed(session!.user.id);
    setNewsfeed(activities);
    setIsLoading(false);
  };

  const addDiscussionPostToFeed = (newPost: Activity) => {
    if (!session?.user?.firstName || !session?.user?.lastName) return;

    const activityDetails: ActivityDetails = {
      ...newPost,
      activityDescription: "Started a discussion",
      user: {
        id: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        email: session.user.email,
        profileImageUrl: session.user.profileImageUrl || null,
      },
    };

    setNewsfeed((prevNewsfeed) => [activityDetails, ...prevNewsfeed]);
  };

  useEffect(() => {
    if (session) {
      getNewsFeed();
    }
  }, [session]);

  return (
    <main className="w-full md:w-[73%] md:ml-[27%]  mb-10 p-4 md:p-6 bg-white border border-olive-green-100">
      <div className="flex items-center gap-2  border-navy-600  mb-4">
        <BookOpen className="h-5 w-5 text-navy-600" />
        <h2 className={`${lora.className} text-navy-600 text-lg font-medium`}>
          Newsfeed
        </h2>
      </div>

      <DiscussionBox onNewPost={addDiscussionPostToFeed} />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 text-olive-green-400 animate-spin" />
        </div>
      ) : newsfeed.length === 0 ? (
        <div className="text-center py-8 text-navy-500">
          <p>No activities yet. Start by sharing a discussion!</p>
        </div>
      ) : (
        <div className="mt-2">
          {newsfeed.map((activity, index) => (
            <div key={activity.id}>
              <NewsItem item={activity} />
              {index < newsfeed.length - 1 && (
                <Separator className="bg-olive-green-100" />
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
