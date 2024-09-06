import db from "@/db"
import { entries } from "@/entries"
import { eq } from "drizzle-orm"
import { z } from "zod"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  console.log(`GET entries/${params.slug}`)

  const entry = await db.select().from(entries).where(eq(entries.id, 1))

  if (!entry) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  if (entry.length < 1) {
    return Response.json({ message: "No entries found" }, { status: 404 })
  }

  return Response.json({ entry })
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {

  console.log(`DELETE entries/${params.id}`)

  const id = z.coerce.number().parse(params.id)

  const result = await db.delete(entries).where(eq(entries.id, id))

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  if (result.length < 1) {
    return Response.json({ message: "No entries found" }, { status: 404 })
  }

  return Response.json({ message: "Deleting Entries" });
}
