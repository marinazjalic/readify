"use client";

import { getActivitiesForFeed } from "@/actions/activity/getActivities";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Newsfeed() {
  const { data: session } = useSession();

  const getNewsFeed = async () => {
    const activities = await getActivitiesForFeed(session!.user.id);
  };

  useEffect(() => {
    if (session) {
      getNewsFeed();
    }
  });

  return (
    <main className="flex-1 min-h-[50vh] md:min-h-screen p-4 md:p-6 white md:ml-[30%] bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">News Feed</h2>
      <div className="space-y-4">
        {/* temp news item */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="font-medium">Title</p>
          <p className="text-gray-600 text-sm mt-2">Placeholder text</p>
        </div>
      </div>
    </main>
  );
}
