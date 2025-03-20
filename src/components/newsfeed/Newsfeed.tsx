"use client";

import { getActivitiesForFeed } from "@/actions/activity/getActivities";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { ActivityDetails } from "@/types";

export default function Newsfeed() {
  const { data: session } = useSession();
  const [newsfeed, setNewsfeed] = useState<ActivityDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNewsFeed = async () => {
    const activities = await getActivitiesForFeed(session!.user.id);
    setNewsfeed(activities);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      getNewsFeed();
    }
  }, [session]);

  return (
    <main
      className="flex-1 min-h-[50vh] md:min-h-screen p-4 md:p-6 
    ml-10 md:ml-[32%] mt-4 mr-5 mb-10 flex flex-col gap-y-3"
    >
      {isLoading ? (
        <p>...loading</p>
      ) : (
        newsfeed.map((activity) => (
          <NewsItem key={activity.id} item={activity} />
        ))
      )}
    </main>
  );
}
