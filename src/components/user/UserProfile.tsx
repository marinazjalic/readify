"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { ReadingStatus } from "@prisma/client";

export default function UserProfile() {
  const {
    firstName,
    lastName,
    email,
    profileImageUrl,
    followerIds,
    followingIds,
    savedBooks,
    isLoadingBooks,
  } = useUserContext();

  return (
    <aside className="w-full md:w-[27%] md:fixed md:h-[77vh] p-4 bg-white mt-7 ml-5 border ml-2">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 mb-4">
          <AvatarImage src={undefined} alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-medium">
          {firstName} {lastName}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{email}</p>

        <div className="flex gap-4">
          <Link
            href="/followers"
            className="text-blue-500 hover:underline text-xs"
          >
            {followerIds?.length} follower{" "}
            {followerIds?.length === 1 ? "" : "s"}
          </Link>
          <Link
            href="/following"
            className="text-blue-500 hover:underline text-xs"
          >
            {followingIds?.length} following
          </Link>
        </div>
      </div>

      <Separator className="mx-auto w-[90%] md:w-[80%]" />

      <div className="py-4">
        <h3 className="text-sm text-navy-600 mb-2 px-4">
          VIEW VIRTUAL LIBRARY
        </h3>

        <div className="flex items-start px-2">
          <Image
            src="/assets/saved-book-icon.png"
            alt="Book icon"
            width={60}
            height={60}
            className="flex-shrink-0"
          />
          <div className="flex flex-col text-xs text-gray-500 ml-2 mt-0.5 space-y-1">
            <Link href="/" className="hover:underline">
              {
                savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.TO_READ
                ).length
              }{" "}
              Want to Read
            </Link>
            <Link href="/" className="hover:underline">
              {
                savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.IN_PROGRESS
                ).length
              }{" "}
              Currently Reading
            </Link>
            <Link href="/" className="hover:underline">
              {
                savedBooks?.filter(
                  (book) => book.savedInfo?.status === ReadingStatus.COMPLETED
                ).length
              }{" "}
              Read
            </Link>
          </div>
        </div>
      </div>

      <Separator className="mx-auto w-[90%] md:w-[80%]" />

      <div className="py-4">
        <h3 className="text-sm text-navy-600 px-4">READING CHALLENGE</h3>
        <div className="w-[85%] ml-4">
          <div className="bg-gray-300 w-full h-2.5 rounded-md  mt-2">
            <div
              className={`bg-olive-green-500 h-full rounded-md w-[35%]`}
            ></div>
          </div>
          <div className="flex flex-row text-xxs text-gray-500 mt-1">
            <p>0/50 books read</p>
            <p className="ml-auto">Update goal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
