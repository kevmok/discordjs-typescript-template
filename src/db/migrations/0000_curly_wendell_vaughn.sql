CREATE TABLE IF NOT EXISTS "channels" (
	"channel_id" integer PRIMARY KEY NOT NULL,
	"channel_name" text NOT NULL,
	"user_role_id" text,
	"channel_type" text DEFAULT 'general'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "generic" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL
);
