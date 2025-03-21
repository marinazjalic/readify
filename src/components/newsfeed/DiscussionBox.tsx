"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { createActivity } from "@/actions/activity/createActivity";
import { useSession } from "next-auth/react";
import { Activity, ActivityType } from "@prisma/client";

interface DiscussionBoxProps {
  onNewPost: (newPost: Activity) => void;
}

export default function DiscussionBox({ onNewPost }: DiscussionBoxProps) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const handlePostButtonClick = async () => {
    if (session && content != "") {
      const newPost = await createActivity(
        session.user.id,
        ActivityType.DISCUSSION,
        undefined,
        undefined,
        content
      );
      setContent("");

      if (newPost.data) {
        onNewPost(newPost.data);
      }
    }
  };

  return (
    <div className="w-full bg-transparent mb-4">
      <div className="flex items-start gap-2">
        <textarea
          id="input"
          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-olive-green-500 focus:border-olive-green-500 transition-colors min-h-[40px] max-h-[150px] resize-none overflow-auto resize-none overflow-hidden"
          placeholder="Start a discussion..."
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "40px";
            target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
            setContent(target.value);
          }}
        />
        <Button
          onClick={handlePostButtonClick}
          className="rounded-full bg-olive-green-500 hover:bg-olive-green-600 text-white px-5 py-2.5 text-sm font-medium transition-colors shrink-0"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
