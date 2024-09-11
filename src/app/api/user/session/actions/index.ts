'use server'

import db from "@/db"
import { userSession } from "@/schema"
import { eq } from "drizzle-orm"

export const getSession = async (userId: string) => {
  const result = await db.select().from(userSession).where(eq(userSession.userId, userId)).orderBy(userSession.updatedAt)

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}

export const createSession = async (userId: string) => {
  const result = await db.insert(userSession).values({ userId })

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}


export const deleteSession = async (userId: string) => {
  const result = await db.delete(userSession).where(eq(userSession.userId, userId))

  if (!result) {
    return Response.json({ message: "Error" }, { status: 404 })
  }

  return Response.json({ status: 200, result });
}
