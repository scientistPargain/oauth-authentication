import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleRoleButton } from "./ToggleRoleButton";
import { getCurrentUser } from "@/auth/nextjs/currentUser";

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  return (
    <div className="container mx-auto p-4 py-16 h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
