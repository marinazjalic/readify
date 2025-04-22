"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { createActivity } from "@/actions/activity/createActivity";
import { useSession } from "next-auth/react";
import { Activity, ActivityType } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface DiscussionBoxProps {
  onNewPost: (newPost: Activity) => void;
}

export default function DiscussionBox({ onNewPost }: DiscussionBoxProps) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const [discussion, setDiscussion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!discussion.trim() || !session?.user?.id) {
      return;
    }
    setIsSubmitting(true);
    try {
      const newPost = await createActivity(
        session.user.id,
        ActivityType.DISCUSSION,
        undefined,
        undefined,
        discussion
      );

      if (newPost.data) {
        onNewPost(newPost.data);
        setDiscussion("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
        <Textarea
          placeholder="Share your thoughts or start a discussion..."
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)}
          className="min-h-[100px] resize-none border-olive-green-100 focus:border-light-blue focus:ring-light-blue"
        />
        <div className="flex justify-end">
          <Button
            type="button"
            disabled={!discussion.trim() || isSubmitting}
            onClick={handlePostButtonClick}
            className="bg-aqua hover:bg-olive-green-400 text-white flex items-center text-xs h-7"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
      <Separator className="mt-4 bg-olive-green-100" />
    </div>
  );
}
