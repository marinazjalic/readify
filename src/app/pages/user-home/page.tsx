import UserProfile from "@/components/UserProfile";
import Newsfeed from "@/components/Newsfeed";

export default function UserHomePage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <UserProfile />
      <Newsfeed />
    </div>
  );
}
