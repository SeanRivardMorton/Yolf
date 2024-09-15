import db from "@/db";
import { getSession } from "@/lib/session";
import { entries } from "@/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();

  const userEntries = await db.select().from(entries).where(eq(entries.createdBy, session.user.id));

  return new Response(JSON.stringify(userEntries));
}
