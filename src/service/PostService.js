// services/PostService.js
import { BASE_URL } from "@/constant/api";

export const createPost = async (post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to create a new post.");
  }
};

// Update, Delete, etc.
