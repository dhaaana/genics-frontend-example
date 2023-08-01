"use client";
import { BASE_URL } from "@/constant/api";
import { getToken } from "@/utils/token";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserPostList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bearerToken = getToken();

  useEffect(() => {
    if (!bearerToken) {
      router.push("/login");
    }
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/user`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <p className="text-2xl font-semibold">Loading...</p>
      ) : posts !== null ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-white rounded-lg border-2">
              <Link
                href={`/${post.id}`}
                className="text-lg font-bold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          You have no posts.{" "}
          <Link href="/dashboard/add" className="font-semibold hover:underline">
            Create one now
          </Link>
        </p>
      )}
    </div>
  );
};

export default UserPostList;
