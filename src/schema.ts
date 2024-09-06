import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// NOTE: View drizzle docs for a better understanding of usage.
// https://orm.drizzle.team/docs/zod
// 
// Keep all schema in one file, and use string search to find relevant block. 
// instead of splitting it up into tiny files.

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

// Entries
export const entries = pgTable("entries", {
        id: serial("id"),
        title: text("title"),
        content: text("content"),
        createdAt: timestamp("created_at"),
        updatedAt: timestamp("updated_at"),
})

export const insertEntrySchema = createInsertSchema(entries);

export const selectEntrySchema = createSelectSchema(entries);
