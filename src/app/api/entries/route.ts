import db from "@/db";
import { entries } from "@/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  console.log('GET ENTRIES')

  const result = await db.select().from(entries).orderBy(desc(entries.updatedAt))

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  if (result.length < 1) {
    const newDocument = await db.insert(entries).values({ title: 'New Entry', content: 'start writing!' })
    return Response.json({ status: 200, result: [newDocument] });
  }


  return Response.json({ status: 200, result });
}

export async function POST(request: Request) {
  console.log('POST /entries')

  const body = await request.json()

  const result = await db.insert(entries).values({
    title: 'New Entry',
    content: 'New Entry Content',
  })

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}


