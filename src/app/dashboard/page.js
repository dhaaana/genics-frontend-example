import BackButton from "@/components/button/BackButton";
import LogoutButton from "@/components/button/LogoutButton";
import Profile from "@/components/dashboard/Profile";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="p-4 sm:p-8">
      <div className="flex justify-between items-center mb-2">
        <BackButton />
        <div className="flex gap-x-2">
          <Link href="/dashboard/add">
            <button className="p-2 px-4 gap-x-2 bg-black hover:bg-gray-800 text-white rounded-md flex">
              <Plus />
              Add Post
            </button>
          </Link>
          <LogoutButton />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2">Profile</h1>
      <Profile />
    </main>
  );
}
