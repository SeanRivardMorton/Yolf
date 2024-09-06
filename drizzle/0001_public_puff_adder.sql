CREATE TABLE IF NOT EXISTS "entries" (
	"id" serial NOT NULL,
	"title" text,
	"content" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
