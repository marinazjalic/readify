import UserProfile from "@/components/user/UserProfile";
import Newsfeed from "@/components/Newsfeed";

export default function UserHomePage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <UserProfile />
      <Newsfeed />
    </div>
  );
}
