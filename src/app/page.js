import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold text-center my-5">
        Welcome to my blog
      </h1>
      <PostList />
    </main>
  );
}
