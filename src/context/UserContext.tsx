"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getSavedBooksByUser } from "@/actions/books/getSavedBooksByUser";
import type { DisplayBook } from "@/types";

type UserContextType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | undefined;
  followerIds: string[] | undefined;
  followingIds: string[] | undefined;
  savedBooks: DisplayBook[] | undefined;
  isLoadingBooks: boolean;
  refreshSavedBooks: () => Promise<void>;
  updateFollowingIds: (newFollowingIds: string[]) => void;
  updateFollowerIds: (newFollowerIds: string[]) => void;
};

const defaultValue: UserContextType = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  profileImageUrl: "",
  followerIds: [],
  followingIds: [],
  savedBooks: [],
  isLoadingBooks: false,
  refreshSavedBooks: async () => {},
  updateFollowingIds: () => {},
  updateFollowerIds: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  //get these states from the session
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    ""
  );
  const [followerIds, setFollowerIds] = useState<string[] | undefined>([]);
  const [followingIds, setFollowingIds] = useState<string[] | undefined>([]);

  const [savedBooks, setSavedBooks] = useState<DisplayBook[] | undefined>(
    undefined
  );
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserId(session.user.id || "");
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
      setEmail(session.user.email || "");
      setProfileImageUrl(session.user.profileImageUrl || "");
      setFollowerIds(session.user.followerIds || []);
      setFollowingIds(session.user.followingIds || []);

      fetchSavedBooks(session.user.id);
    }
  }, [status, session]);

  const fetchSavedBooks = async (userId: string) => {
    try {
      const books = await getSavedBooksByUser(userId);
      if (books) {
        setSavedBooks(books);
      }
    } catch (error) {
      console.error("Error fetching saved books:", error);
    }
  };

  const refreshSavedBooks = async () => {
    await fetchSavedBooks(userId);
  };

  const updateFollowingIds = (newFollowingIds: string[]) => {
    setFollowingIds(newFollowingIds);
  };

  const updateFollowerIds = (newFollowerIds: string[]) => {
    setFollowerIds(newFollowerIds);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        firstName,
        lastName,
        email,
        profileImageUrl,
        followerIds,
        followingIds,
        savedBooks,
        isLoadingBooks,
        refreshSavedBooks,
        updateFollowingIds,
        updateFollowerIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
