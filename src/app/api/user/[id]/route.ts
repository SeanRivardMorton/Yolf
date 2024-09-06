import db from "@/db";
import { eq } from "drizzle-orm";
import { selectUserSchema, user } from '@/schema'
import z from 'zod'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log(`GET user/${params.id}`)

  const id = z.coerce.number().parse(params.id)

  const response = await db.select().from(user).where(eq(user.id, id))

  if (!response) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  if (response.length < 1) {
    return Response.json({ message: "User not found" }, { status: 404 })
  }

  return Response.json({ message: "Getting Entries", response });
}
