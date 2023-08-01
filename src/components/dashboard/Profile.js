"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/constant/api";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const bearerToken = getToken();

  useEffect(() => {
    if (!bearerToken) {
      router.push("/login");
    }
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <p className="text-2xl font-semibold">Loading...</p>
      ) : profileData ? (
        <div>
          <h2 className="text-3xl font-bold mb-1">{profileData.name}</h2>
          <p className="text-gray-600">{profileData.email}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
