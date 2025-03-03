DO $$ BEGIN IF NOT EXISTS (
	SELECT 1
	FROM pg_type
	WHERE typname = 'oauth_provides'
) THEN CREATE TYPE "public"."oauth_provides" AS ENUM('discord', 'github', 'google');
END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN IF NOT EXISTS (
	SELECT 1
	FROM pg_type
	WHERE typname = 'user_roles'
) THEN CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user');
END IF;
END $$;
--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"userId" uuid NOT NULL,
	"provider" "public"."oauth_provides" NOT NULL,
	"providerAccountId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_providerAccountId_provider_pk" PRIMARY KEY("providerAccountId", "provider"),
	CONSTRAINT "user_oauth_accounts_providerAccountId_unique" UNIQUE("providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"imageUrl" text,
	"password" text,
	"salt" text,
	"role" "public"."user_roles" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_oauth_accounts"
ADD CONSTRAINT "user_oauth_accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;