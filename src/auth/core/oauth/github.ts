import { env } from "@/data/env/server";
import { OAuthClient } from "./base";
import { z } from "zod";

export function createGithubOAuthClient() {
  return new OAuthClient({
    provider: "github",
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    scopes: ["user:email", "read:user"],
    urls: {
      auth: "https://github.com/login/oauth/authorize",
      token: "https://github.com/login/oauth/access_token",
      user: "https://api.github.com/user", // this contain email, but only public one
      userEmail: "https://api.github.com/user/emails", // to access private emails
    },
    userInfo: {
      schema: z.object({
        id: z.number(),
        name: z.string().nullable(),
        login: z.string(),
        email: z.string().email().nullable(),
      }),
      parser: (user) => ({
        id: user.id.toString(),
        name: user.name ?? user.login,
        email: user?.email || "", // if someone have set their email private then this will fail.
      }),
    },
    userEmails: {
      schema: z.array(
        z.object({
          email: z.string(),
          primary: z.boolean(),
          verified: z.boolean(),
          visibility: z.string().nullable(),
        })
      ),
      parser: (data) => ({
        emails: data
          .sort((a, b) => (b.primary ? 1 : -1))
          .map((email) => ({ email: email.email })),
      }),
    },
  });
}
