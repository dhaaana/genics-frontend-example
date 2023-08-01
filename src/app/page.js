import PostList from "@/components/PostList";
import LoginButton from "@/components/button/LoginButton";

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-center">Genics Blog</h1>
        <LoginButton />
      </div>
      <PostList />
    </main>
  );
}
