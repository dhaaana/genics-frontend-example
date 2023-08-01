import BackButton from "@/components/button/BackButton";
import RegisterForm from "@/components/register/RegisterForm";

export default function Login() {
  return (
    <main className="sm:p-8 p-4">
      <BackButton />
      <RegisterForm />
    </main>
  );
}
