CREATE TABLE IF NOT EXISTS "user_session" (
	"id" uuid DEFAULT gen_random_uuid(),
	"user_id" uuid,
	"session_token" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
