import db from "@/db";
import { entries } from "@/schema";
import { eq } from "drizzle-orm";
import { getSession } from "./session";

export async function getCurrentUserEntries() {
  const currentUser = await getSession();
  const userEntries = await db.select().from(entries).where(eq(entries.createdBy, currentUser.user.id));
  return userEntries;
}

export async function getEntriesByUserId(id: string) {
  const userEntries = await db.select().from(entries).where(eq(entries.createdBy, id));
  return userEntries;
}
