"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BASE_URL } from "@/constant/api";

const PostById = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostById = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
          setError("");
        } else {
          setError("Post not found.");
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Error fetching post.");
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId !== "") {
      fetchPostById();
    }
  }, [postId]);

  return (
    <div className="container bg-white">
      <Link href="/">
        <button className="p-2 mb-4 bg-black hover:bg-gray-800 text-white rounded-full">
          <ArrowLeft />
        </button>
      </Link>
      {isLoading ? (
        <p className="text-2xl font-bold">Loading...</p>
      ) : error ? (
        <p className="text-2xl font-bold">{error}</p>
      ) : post ? (
        <div>
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-2 font-semibold">
            By {post.author.name}
          </p>
          <p className="text-gray-600">{post.body}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PostById;
