import BackButton from "@/components/button/BackButton";
import AddPostForm from "@/components/dashboard/add/AddPostForm";

export default function Add() {
  return (
    <main className="p-4 sm:p-8">
      <BackButton href="/dashboard" />
      <AddPostForm />
    </main>
  );
}
