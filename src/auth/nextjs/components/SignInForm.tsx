"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { oAuthSignIn, signIn } from "../actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signInSchema } from "../schemas";
import Link from "next/link";
import githubLogo from "@/../public/github-logo.png";
import googleLogo from "@/../public/google-logo.png";
import discordLogo from "@/../public/discord-logo-white.png";
import Image from "next/image";

export function SignInForm() {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const error = await signIn(data);
    setError(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <p className="text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button asChild variant="link">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
      <div className="flex gap-4 border border-white border-t-gray-300 mt-4 p-4">
        <Button
          className="w-full"
          type="button"
          onClick={async () => await oAuthSignIn("google")}
        >
          <Image src={googleLogo} height={18} width={18} alt="github logo" />{" "}
          Google
        </Button>
        <Button
          className="w-full"
          type="button"
          onClick={async () => await oAuthSignIn("github")}
        >
          <Image src={githubLogo} height={18} width={18} alt="github logo" />{" "}
          GitHub
        </Button>
        <Button
          className="w-full"
          type="button"
          onClick={async () => await oAuthSignIn("discord")}
        >
          <Image src={discordLogo} height={18} width={18} alt="github logo" />{" "}
          Discord
        </Button>
      </div>
    </Form>
  );
}
