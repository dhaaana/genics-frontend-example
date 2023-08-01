import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ href = "/" }) {
  return (
    <Link href={href}>
      <button className="p-2 mb-4 bg-black hover:bg-gray-800 text-white rounded-full">
        <ArrowLeft />
      </button>
    </Link>
  );
}
