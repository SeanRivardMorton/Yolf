import db from "@/db"
import { entries } from "@/entries"
import { eq } from "drizzle-orm"

export async function GET(request: Request, { params }: { params: { slug: string }) {
  console.log(`GET entries/${params.slug}`)

  const entry = await db.select().from(entries).where(eq(entries.id, 1))

  if (!entry) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  return Response.json({ entry })
}
