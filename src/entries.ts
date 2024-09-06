import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Entries
//
// TODO: Move to a separate file when appropriate

export const entries = pgTable("entries", {
  id: serial("id"),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

