import db from "@/db";
import { entries } from "@/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, params: { id: string }) {
  const id = params.id;

  const userEntries = await db.select().from(entries).where(eq(entries.createdBy, id));

  return new Response(JSON.stringify(userEntries));
}
