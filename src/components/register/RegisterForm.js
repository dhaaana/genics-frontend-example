"use client";
import { BASE_URL } from "@/constant/api";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = (input, rule, realPassword = "") => {
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
    } else if (rule === "confirmPassword") {
      if (!input.trim()) {
        return "Confirm password cannot be empty";
      } else if (input !== realPassword) {
        return "Passwords do not match";
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
    const confirmPasswordError = validateInput(
      confirmPassword,
      "confirmPassword",
      password
    );

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        ...errors,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        form: "",
      });
    } else {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        form: "",
      });
      setIsLoading(true);
      await handleRegister();
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // ... (perform the actual registration process here if needed)
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        setErrors({
          email: "",
          password: "",
          confirmPassword: "",
          form: errorMessage,
        });
      }
    } catch (error) {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        form: "Registration failed due to server error. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto w-full sm:w-1/3">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
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
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`w-full px-3 py-2 mt-1 text-gray-700 border-2 rounded-lg focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
          {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
        </button>
        <p className="text-center mt-4 sm:text-md text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
