import BackButton from "@/components/button/BackButton";
import RegisterForm from "@/components/register/RegisterForm";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <main className="sm:p-8 p-4">
      <BackButton />
      <RegisterForm />
    </main>
  );
}
