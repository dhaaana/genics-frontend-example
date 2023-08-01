"use client";
import { BASE_URL } from "@/constant/api";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data);
          setError("");
        } else {
          setError("Error fetching posts");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-2xl font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
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
    </div>
  );
};

export default PostList;
