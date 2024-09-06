import db from '../../../db/index'
import { user } from '../../../schema'

export async function GET() {

  const users = await db.select().from(user)
  console.log('GET USERS', users)

  return Response.json({ message: "GET USERS" });
}
