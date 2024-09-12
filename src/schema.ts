import { serial, text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// NOTE: View drizzle docs for a better understanding of usage.
// https://orm.drizzle.team/docs/zod
// 
// Keep all schema in one file, and use string search to find relevant block. 
// instead of splitting it up into tiny files.

export const user = pgTable("user", {
  id: uuid("id").defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const User = user;

export const insertUserSchema = createInsertSchema(user);

export const selectUserSchema = createSelectSchema(user);

// Entries
export const entries = pgTable("entries", {
  id: serial("id"),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const insertEntrySchema = createInsertSchema(entries);

export const selectEntrySchema = createSelectSchema(entries);

export const userSession = pgTable("user_session", {
  id: uuid("id").defaultRandom(),
  userId: uuid("user_id"),
  sessionToken: text("session_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})


