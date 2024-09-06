import db from "@/db";
import { entries } from "@/entries";
import { request } from "http";

export async function GET() {
  console.log('GET ENTRIES')

  const result = await db.select().from(entries)

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  if (result.length < 1) {
    return Response.json({ message: "No entries found" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}

export async function POST(request: Request) {
  console.log('POST /entries')

  const body = await request.json()

  const result = await db.insert(entries).values({
    title: body.title,
    content: body.content,
  })

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}


export async function DELETE(request: Request, params: { id: string }) {
  const id = parseInt(params.id)
  console.log('DELETE /entries', id)

  return Response.json({ message: "Deleting Entries" });
}