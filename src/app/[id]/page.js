import PostById from "@/components/PostById";
import { useRouter } from "next/navigation";

export default function Post({ params }) {
  return (
    <main className="p-8">
      <PostById postId={params.id} />
    </main>
  );
}
