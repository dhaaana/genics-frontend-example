"use client";
import Link from "next/link";
import { BASE_URL } from "@/constant/api";
import { getToken } from "@/utils/token";
import React, { useState, useEffect } from "react";

export default function LoginButton() {
  const [profileData, setProfileData] = useState(null);
  const bearerToken = getToken();

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.data);
      }
    };

    fetchProfileData();
  }, []);

  if (profileData) {
    return (
      <Link href="/dashboard">
        <button className="py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-md">
          Dashboard
        </button>
      </Link>
    );
  }

  return (
    <Link href="/login">
      <button className="py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-md">
        Login
      </button>
    </Link>
  );
}
