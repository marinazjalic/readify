import useSWR from "swr";
import { getUserDetails } from "@/actions/users/getUserDetails";
import { getByIds } from "@/actions/following/getByIds";
import { User, Challenge } from "@prisma/client";
import { getChallengeByUser } from "@/actions/challenge/getChallengeByUser";

const profileFetcher = async (
  userId: string
): Promise<Omit<User, "password"> | null> => {
  return getUserDetails(userId);
};

//reusable for followers/following list
const followFetcher = async (idList: string[]): Promise<FollowUser[]> => {
  return getByIds(idList);
};

const challengeFetcher = async (userId: string): Promise<Challenge | null> => {
  return await getChallengeByUser(userId);
};

export interface FollowUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
}

export function useUserSWR(userId?: string) {
  const {
    data: userProfile,
    error: userProfileError,
    isValidating: isProfileLoading,
    mutate,
  } = useSWR(userId ? userId : null, profileFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const {
    data: followers,
    error: followersError,
    mutate: mutateFollowers,
  } = useSWR(
    userProfile?.followerIds ? ["followers", userProfile.followerIds] : null,
    ([_, ids]) => followFetcher(ids),
    {
      revalidateOnFocus: true,
      dedupingInterval: 30000,
    }
  );

  const {
    data: followingList,
    error: followingError,
    mutate: mutateFollowing,
  } = useSWR(
    userProfile?.followingIds ? ["following", userProfile.followingIds] : null,
    ([_, ids]) => followFetcher(ids),
    {
      revalidateOnFocus: true,
      dedupingInterval: 30000,
    }
  );

  const {
    data: challenge,
    error: challengeError,
    isValidating: isChallengeLoading,
    mutate: mutateChallenge,
  } = useSWR(
    userId ? ["challenge", userId] : null,
    ([_, id]) => challengeFetcher(id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    userProfile,
    userProfileError,
    isProfileLoading,
    mutate,
    followers,
    followersError,
    mutateFollowers,
    followingList,
    followingError,
    mutateFollowing,
    challenge,
    challengeError,
    isChallengeLoading,
    mutateChallenge,
  };
}
