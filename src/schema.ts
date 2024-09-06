import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// https://orm.drizzle.team/docs/zod

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const insertUserSchema = createInsertSchema(user);

export const selectUserSchema = createSelectSchema(user);

// Usage:

const exampleUser = insertUserSchema.parse({
  name: "John Doe",
  email: "",
  role: 'customer'
})

// Zod schema type is also inferred from the table schema, so you have full type safety
const userRequestSchema = insertUserSchema.pick({ name: true, email: true })

// Entries
// TODO: Move to a separate file when appropriate
export const entries = pgTable("entries", {
  id: serial("id"),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})

export const insertEntrySchema = createInsertSchema(entries);

export const selectEntrySchema = createSelectSchema(entries);
