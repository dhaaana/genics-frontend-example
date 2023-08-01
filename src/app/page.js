import PostList from "@/components/PostList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-center">Genics Blog</h1>
        <Link href="/login">
          <button className="py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-md">
            Login
          </button>
        </Link>
      </div>
      <PostList />
    </main>
  );
}
