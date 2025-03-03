import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  console.log("full user is: ", fullUser);
  return (
    <div className="container mx-auto p-4 py-16 h-full flex justify-center items-center">
      {fullUser == null ? (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      ) : (
        <Card className="max-w-[500px] mt-4">
          <CardHeader>
            <div className="flex flex-row gap-4 items-center">
              <Avatar>
                {fullUser.imageUrl && <AvatarImage src={fullUser.imageUrl} />}
                <AvatarFallback>
                  {fullUser.name
                    .split(" ")
                    .map((data) => data[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>User: {fullUser.name}</CardTitle>
                <CardDescription>Role: {fullUser.role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/private">Private Page</Link>
            </Button>
            {fullUser.role === "admin" && (
              <Button asChild variant="outline">
                <Link href="/admin">Admin Page</Link>
              </Button>
            )}
            <LogOutButton />
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
