import BackButton from "@/components/button/BackButton";
import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <main className="sm:p-8 p-4">
      <BackButton />
      <LoginForm />
    </main>
  );
}
