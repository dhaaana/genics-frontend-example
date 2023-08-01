"use client";

import { removeToken } from "@/utils/token";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <button
      className="p-2 px-4 gap-x-2 bg-black hover:bg-gray-800 text-white rounded-md flex"
      onClick={handleLogout}
    >
      <LogOut />
      Logout
    </button>
  );
}
