"use client";
import { BASE_URL } from "@/constant/api";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { setToken } from "@/utils/token";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateInput = (input, rule) => {
    // Validate input based on rule
    if (rule === "email") {
      if (!input.trim()) {
        return "Email cannot be empty";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        return "Invalid email format";
      } else {
        return "";
      }
    } else if (rule === "password") {
      if (!input.trim()) {
        return "Password cannot be empty";
      } else if (input.length < 6) {
        return "Password must be at least 6 characters long";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateInput(email, "email");
    const passwordError = validateInput(password, "password");

    // If there is any error, setErrors will be called
    if (emailError || passwordError) {
      setErrors({
        ...errors,
        email: emailError,
        password: passwordError,
        form: "",
      });
    } else {
      setErrors({ email: "", password: "", form: "" });
      // Start loading
      setIsLoading(true);
      await handleLogin();
      // End loading
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Save the token to cookies
        const userData = await response.json(); // Parse the response
        const token = userData.data.token;
        setToken(token);
        router.push("/dashboard");
      } else {
        const errorData = await response.json(); // Parse the error response
        const errorMessage = errorData.message;
        setErrors({
          email: "",
          password: "",
          form: errorMessage,
        });
      }
    } catch (error) {
      setErrors({
        email: "",
        password: "",
        form: "Login failed due to server error. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto w-11/12 sm:w-1/3">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 mt-1 text-gray-700 border-2 rounded-lg focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-3 py-2 mt-1 text-gray-700 border-2 rounded-lg focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {errors.form && (
          <p className="text-red-500 text-sm mb-4">{errors.form}</p>
        )}
        <button
          type="submit"
          className="py-3 w-full text-white flex justify-center bg-black rounded hover:bg-gray-800 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
        </button>
        <p className="text-center mt-4 sm:text-md text-sm">
          Doesn't have an account?{" "}
          <Link href="/register" className="font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
