import db from "@/db"
import { entries } from "@/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log(`GET entries/${params.id}`)

  const result = await db.select().from(entries).where(eq(id, params.id)).orderBy(entries.updatedAt)

  if (!result) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  console.log(result)

  if (result.length < 1) {
    return Response.json({ message: "No entries found" }, { status: 404 })
  }

  return Response.json({ result })
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {

  console.log(`DELETE entries/${params.id}`)

  const id = z.coerce.number().parse(params.id)

  const result = await db.delete(entries).where(eq(entries.id, id))
  console.log(result)

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }


  return Response.json({ message: "Deleting Entries" });
}

export async function PUT(request: Request) {
  console.log('PUT /entries/:id')

  const body = await request.json()

  const result = await db.update(entries).set({ title: body.title, content: body.content }).where(eq(entries.id, body.id)).returning({ title: entries.title })

  console.log(result)
  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}
