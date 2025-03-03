import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4 py-16 h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Admin</h1>
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
